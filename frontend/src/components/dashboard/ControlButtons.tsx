import React from "react";
import { BatteryCharging, PlayCircle, StopCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ControlButtonsProps {
    handleClick: (state: string, elevation: number) => void;
    targetElevation: number;
    setElevation: (elevation: number) => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ handleClick, targetElevation, setElevation }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4">
                <Button
                    onClick={() => handleClick("precharging", targetElevation)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white flex items-center gap-2"
                >
                    Precharge <BatteryCharging className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => handleClick("adjusting", targetElevation)}
                    className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                >
                    Start <PlayCircle className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => handleClick("stopping", targetElevation)}
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                >
                    Stop & Discharge <StopCircle className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="elevation" className="text-sm font-medium">
                    Target Elevation (cm):
                </label>
                <input
                    id="elevation"
                    type="number"
                    defaultValue={55}
                    min="0"
                    max="100"
                    onChange={(e) => setElevation(Number(e.target.value))}
                    className="w-20 p-1 border rounded-md text-sm"
                />
            </div>
        </div>
    );
};

export default ControlButtons;