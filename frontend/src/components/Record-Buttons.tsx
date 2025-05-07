import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StopCircle, Circle } from "lucide-react"; // Import icons from lucide-react

interface RecordButtonsProps {
    isRecording: boolean;
    elapsedTime: number;
    toggleRecording: () => void;
}

const RecordButtons: React.FC<RecordButtonsProps> = ({ isRecording, elapsedTime, toggleRecording }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Card className="w-[30%] mx-auto  p-4 flex flex-col items-center gap-4">
            <Button variant="default" onClick={toggleRecording} className="w-40 flex items-center justify-center gap-2">
                {isRecording ? (
                    <>
                        <StopCircle className="text-red-600" /> Stop Recording
                    </>
                ) : (
                    <>
                        <Circle className="text-red-600" /> Start Recording
                    </>
                )}
            </Button>
            {isRecording && (
                <>
                    <div className="text-lg font-bold">
                        Recording Time: {formatTime(elapsedTime)}
                    </div>
                    <div className="text-sm text-red-600 font-semibold">
                        Do not leave /record
                    </div>
                </>
            )}
        </Card>
    );
};

export default RecordButtons;
