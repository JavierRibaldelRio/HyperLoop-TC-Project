import { EventEmitter } from 'events';
import {
    MAX_ELEVATION,
    MIN_ELEVATION,
    MAX_CURRENT,
    MAX_SYSTEM_VOLTAGE,
    PRECHARGE_RATE,
    DISCHARGE_RATE,
    FALL_RATE,
    Kp,
    STABILITY_THRESHOLD,
    PERTURBATION_PROBABILITY,
    MACHINE_STATES,
    TARGET_DISTANCE_DEFAULT
} from '../constants.js';


const trainEvents = new EventEmitter();

let machineState = MACHINE_STATES.IDLE;

let currentState = {
    elevation: 0,        // cm
    voltage: 0,          // V
    current: 0,          // A
    targetElevation: TARGET_DISTANCE_DEFAULT, // mm
};

export function setMachineState(newState, elevation = TARGET_DISTANCE_DEFAULT) {
    switch (newState) {
        case MACHINE_STATES.PRECHARGING:
            if (machineState !== MACHINE_STATES.IDLE) {
                return { type: "error", message: `Cannot transition to precharging from ${machineState}` };
            }
            break;
        case MACHINE_STATES.ADJUSTING:
            if (machineState !== MACHINE_STATES.CHARGED) {
                return { type: "error", message: `Cannot transition to adjusting from ${machineState}` };
            } else if (
                machineState === MACHINE_STATES.RUNNING ||
                machineState === MACHINE_STATES.ADJUSTING
            ) {
                return { type: "error", message: `Machine is already adjusting or running` };
            }
            break;
        case MACHINE_STATES.STOPPING:
            if (machineState === MACHINE_STATES.IDLE) {
                return { type: "error", message: `Cannot transition to stopping from ${machineState}` };
            } else if (machineState === MACHINE_STATES.STOPPING) {
                return { type: "error", message: `Machine is already stopping` };
            }
            break;
    }




    const res_message = `Transitioning from ${machineState} to ${newState}` +
        (currentState.targetElevation !== elevation
            ? ` with new target elevation ${elevation}`
            : '') +
        '.';

    machineState = newState;
    currentState.targetElevation = elevation;


    return { type: "response", message: res_message };
}

export function setTargetElevation(newTarget) {

    if (newTarget < MIN_ELEVATION || newTarget > MAX_ELEVATION) {
        return { message: `Target elevation ${newTarget} is out of bounds (${MIN_ELEVATION}, ${MAX_ELEVATION})`, type: 'error' };
    }
    else {
        currentState.targetElevation = newTarget;

        return { message: `Target elevation set to ${newTarget}`, type: 'response' };
    }
}

export function getCurrentState() {
    return { ...currentState, state: machineState };
}

export function onTrainUpdate(callback) {
    trainEvents.on('update', callback);
}

function simulateStep() {
    switch (machineState) {
        case MACHINE_STATES.IDLE:
            currentState = { elevation: 0, voltage: 0, current: 0, targetElevation: currentState.targetElevation };
            break;

        case MACHINE_STATES.PRECHARGING:
            currentState.voltage = Math.min(currentState.voltage + PRECHARGE_RATE, MAX_SYSTEM_VOLTAGE);
            if (currentState.voltage >= MAX_SYSTEM_VOLTAGE) {
                machineState = MACHINE_STATES.CHARGED;
            }
            break;

        case MACHINE_STATES.CHARGED:
            currentState = { elevation: 0, voltage: MAX_SYSTEM_VOLTAGE, current: 0, targetElevation: currentState.targetElevation };
            break;

        case MACHINE_STATES.ADJUSTING: {
            const error = currentState.targetElevation - currentState.elevation;

            const currentTarget = Math.max(-MAX_CURRENT, Math.min(MAX_CURRENT, Kp * error));
            const pwmRatio = Math.min(Math.abs(currentTarget) / MAX_CURRENT, 1);
            const outputVoltage = pwmRatio * currentState.voltage;

            const newElevation = currentState.elevation + currentTarget * 0.1;

            currentState.elevation = Math.max(0, Math.min(MAX_ELEVATION, newElevation));
            currentState.voltage = currentState.voltage;
            currentState.current = currentTarget;

            if (Math.abs(error) < STABILITY_THRESHOLD) {
                machineState = MACHINE_STATES.RUNNING;
            }
            break;
        }

        case MACHINE_STATES.RUNNING: {
            if (Math.random() < PERTURBATION_PROBABILITY) {
                const deviation = (Math.random() - 0.5) * 2;
                currentState.elevation = Math.max(0, Math.min(MAX_ELEVATION, currentState.elevation + deviation));
            }

            const error = currentState.targetElevation - currentState.elevation;

            currentState.current = 0;
            currentState.voltage = MAX_SYSTEM_VOLTAGE;

            if (Math.abs(error) >= STABILITY_THRESHOLD) {
                machineState = MACHINE_STATES.ADJUSTING;
            }
            break;
        }

        case MACHINE_STATES.STOPPING:
            currentState.voltage = Math.max(0, currentState.voltage - DISCHARGE_RATE);
            currentState.elevation = Math.max(0, currentState.elevation - FALL_RATE);
            currentState.current = 0;

            if (currentState.voltage <= 0 && currentState.elevation <= 0) {
                machineState = MACHINE_STATES.IDLE;
            }
            break;

        default:
            currentState = { elevation: 0, voltage: 0, current: 0, targetElevation: 15 };
    }

    trainEvents.emit('update', getCurrentState());
}


export default function startSimulation() {
    setMachineState(MACHINE_STATES.IDLE);
    currentState = { elevation: 0, voltage: 0, current: 0, targetElevation: TARGET_DISTANCE_DEFAULT };

    // Simulate every 100ms
    setInterval(simulateStep, 100);
}
