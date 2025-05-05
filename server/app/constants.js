export const MAX_ELEVATION = 90;                // cm
export const MIN_ELEVATION = 1;                 // cm
export const MAX_CURRENT = 20;                  // A
export const MAX_SYSTEM_VOLTAGE = 400;          // V
export const PRECHARGE_RATE = 10;               // V per step
export const DISCHARGE_RATE = 20;               // V per step
export const FALL_RATE = 5;                     // mm per step
export const Kp = 1.2;                          // Proportional gain
export const STABILITY_THRESHOLD = 0.5;         // mm
export const PERTURBATION_PROBABILITY = 0.05;   // Probability

export const MACHINE_STATES = {
    IDLE: 'idle',
    PRECHARGING: 'precharging',
    CHARGED: 'charged',
    ADJUSTING: 'adjusting',
    RUNNING: 'running',
    STOPPING: 'stopping',
};

export const TARGET_DISTANCE_DEFAULT = 55; // cm