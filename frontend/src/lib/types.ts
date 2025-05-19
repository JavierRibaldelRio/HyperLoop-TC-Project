export type Phase = "idle" | "precharging" | "charged" | "adjusting" | "running" | "stopping";

export type Data = { elevation: number; voltage: number; current: number, targetElevation: number }

export type Logs =
    { operation: "status update", phase: Phase, data: Data, ts: number }

export type Message =
    { operation: string, type: string, message: string, ts: number };
