import {
    Card,
    CardTitle,
} from "@/components/ui/card"
import { AlertCircle, BatteryCharging, CheckCircle, Settings, PlayCircle, StopCircle, Zap, Activity, Mountain } from "lucide-react";
import ControlButtons from "./ControlButtons";

import { type Data, type Logs, type Phase } from "@/lib/types"

export function StatsDisplay({ stats, handleClick, handleTargetLevitation }: { stats: Logs | null; handleClick: (state: string, elevation: number) => void; handleTargetLevitation: (targetElevation: number) => void }) {

    if (!stats) {

        console.log(stats);
        return (
            <div className="flex h-full w-full items-center justify-center">
                <p className="text-muted-foreground">No stats available</p>
            </div>
        )
    }
    let { phase, data }: { phase: Phase, data: Data } = stats
    console.log('phase :>> ', phase);
    console.log('data :>> ', data);

    const getPhaseDetails = (phase: Phase) => {
        switch (phase) {
            case "idle":
                return { icon: <AlertCircle className="h-6 w-6 text-gray-500" />, color: "gray-500" };
            case "precharging":
                return { icon: <BatteryCharging className="h-6 w-6 text-yellow-500" />, color: "yellow-500" };
            case "charged":
                return { icon: <CheckCircle className="h-6 w-6 text-green-500" />, color: "green-500" };
            case "adjusting":
                return { icon: <Settings className="h-6 w-6 text-purple-500" />, color: "purple-500" };
            case "running":
                return { icon: <PlayCircle className="h-6 w-6 text-blue-500" />, color: "blue-500" };
            case "stopping":
                return { icon: <StopCircle className="h-6 w-6 text-red-500" />, color: "red-500" };
            default:
                return { icon: null, color: "gray-500" };
        }
    };

    const phaseDetails = getPhaseDetails(phase);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 px-4 lg:px-6 w-[100%] mx-auto">
            <Card className="@container/card h-auto col-span-1 sm:col-span-1 flex justify-center p-0 m-0">
                <CardTitle className={`@[250px]/card:text-xl text-lg font-semibold tabular-nums text-${phaseDetails.color} underline break-all`}>
                    <span className="capitalize flex flex-col items-center gap-2">
                        {phase}
                        {phaseDetails.icon}
                    </span>
                </CardTitle>
            </Card>
            <Card className="@container/card h-auto col-span-1 sm:col-span-2 flex justify-center">
                <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
                    <div className={`flex flex-col items-center gap-1 ${data.elevation > 100 ? 'text-red-800' : data.elevation > 90 ? 'text-red-500' : ''}`}>
                        <span className="text-muted-foreground flex items-center gap-2">
                            Elevation
                            <Mountain className={`h-4 w-4 ${data.elevation > 100 ? 'text-red-800' : data.elevation > 90 ? 'text-red-500' : ''}`} />
                        </span>
                        <span className="font-medium numbers-font">{data.elevation.toFixed(2)} cm</span>
                    </div>
                    <div className={`flex flex-col items-center gap-1 ${data.voltage === 400 ? 'text-yellow-500' : ''}`}>
                        <span className="text-muted-foreground flex items-center gap-2">
                            Voltage
                            <Zap className={`h-4 w-4 ${data.voltage === 400 ? 'text-yellow-500' : ''}`} />
                        </span>
                        <span className="font-medium numbers-font">{data.voltage.toFixed(2)} V</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-muted-foreground flex items-center gap-2">
                            Current
                            <Activity className="h-4 w-4" />
                        </span>
                        <span className="font-medium numbers-font">{data.current.toFixed(2)} A</span>
                    </div>
                </div>
            </Card>
            <Card className="@container/card h-auto col-span-1 sm:col-span-3">

                <div className="p-2">
                    <ControlButtons
                        handleClick={handleClick}
                        targetElevation={data.elevation}
                        setElevation={
                            handleTargetLevitation
                        }
                    />
                </div>
            </Card>
        </div >
    )
}