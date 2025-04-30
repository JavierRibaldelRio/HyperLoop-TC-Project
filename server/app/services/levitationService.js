import { EventEmitter } from 'events';

const trainEvents = new EventEmitter();

let machineState = 'idle'; // 'idle' | 'precharging' | 'charged' | 'adjusting' | 'running' | 'stopping'

let currentState = {
    elevation: 0,        // mm
    voltage: 0,          // V
    current: 0,          // A
    targetElevation: 15, // mm — can change dynamically
};

export function setMachineState(newState, elevation = 15) {


    switch (newState) {

        case 'precharging':
            if (machineState !== 'idle') {
                return `Cannot transition to precharging from ${machineState}`;
            }
            break;
        case 'adjusting':
            if (machineState !== 'charged') {
                return `Cannot transition to adjusting from ${machineState}`;
            }

            else if (machineState === 'running' || machineState === 'adjusting') {
                return `Machine is already adjusting or running`;
            }
            break;

        case 'stopping':
            if (machineState === 'idle') {
                return `Cannot transition to stopping from ${machineState}`;
            }

            else if (machineState === 'stopping') {
                return `Machine is already stopping`;
            }
            break;

    }

    // Changes the current data

    const res = `Transitioning from ${machineState} to ${newState}` + (currentState.targetElevation !== elevation ? ` with new target elevation ${elevation}` : '') + '.';

    machineState = newState;
    currentState.targetElevation = elevation;

    return res;


}

export function setTargetElevation(newTarget) {
    currentState.targetElevation = Math.max(0, Math.min(25, newTarget));
}

export function getCurrentState() {
    return { ...currentState, state: machineState };
}

export function onTrainUpdate(callback) {
    trainEvents.on('update', callback);
}

// Constants
const MAX_ELEVATION = 25;
const MAX_CURRENT = 20;
const MAX_SYSTEM_VOLTAGE = 400;
const PRECHARGE_RATE = 10;
const DISCHARGE_RATE = 20;
const FALL_RATE = 5;
const Kp = 1.2;
const STABILITY_THRESHOLD = 0.5;
const PERTURBATION_PROBABILITY = 0.05;

function simulateStep() {
    switch (machineState) {
        case 'idle':
            currentState = { elevation: 0, voltage: 0, current: 0, targetElevation: currentState.targetElevation };
            break;

        case 'precharging':
            currentState.voltage = Math.min(currentState.voltage + PRECHARGE_RATE, MAX_SYSTEM_VOLTAGE);
            if (currentState.voltage >= MAX_SYSTEM_VOLTAGE) {
                machineState = 'charged';
            }
            break;

        case 'charged':
            currentState = { elevation: 0, voltage: MAX_SYSTEM_VOLTAGE, current: 0, targetElevation: currentState.targetElevation };
            break;

        case 'adjusting': {
            const error = currentState.targetElevation - currentState.elevation;

            const currentTarget = Math.max(-MAX_CURRENT, Math.min(MAX_CURRENT, Kp * error));
            const pwmRatio = Math.min(Math.abs(currentTarget) / MAX_CURRENT, 1);
            const outputVoltage = pwmRatio * currentState.voltage;

            const newElevation = currentState.elevation + currentTarget * 0.1;

            currentState.elevation = Math.max(0, Math.min(MAX_ELEVATION, newElevation));
            currentState.voltage = currentState.voltage;
            currentState.current = currentTarget;

            if (Math.abs(error) < STABILITY_THRESHOLD) {
                machineState = 'running';
            }
            break;
        }

        case 'running': {
            if (Math.random() < PERTURBATION_PROBABILITY) {
                const deviation = (Math.random() - 0.5) * 2;
                currentState.elevation = Math.max(0, Math.min(MAX_ELEVATION, currentState.elevation + deviation));
            }

            const error = currentState.targetElevation - currentState.elevation;

            currentState.current = 0;
            currentState.voltage = MAX_SYSTEM_VOLTAGE;

            if (Math.abs(error) >= STABILITY_THRESHOLD) {
                machineState = 'adjusting';
            }
            break;
        }

        case 'stopping':
            currentState.voltage = Math.max(0, currentState.voltage - DISCHARGE_RATE);
            currentState.elevation = Math.max(0, currentState.elevation - FALL_RATE);
            currentState.current = 0;

            if (currentState.voltage <= 0 && currentState.elevation <= 0) {
                machineState = 'idle';
            }
            break;

        default:
            currentState = { elevation: 0, voltage: 0, current: 0, targetElevation: 15 };
    }

    trainEvents.emit('update', getCurrentState());
}

setInterval(simulateStep, 100);
