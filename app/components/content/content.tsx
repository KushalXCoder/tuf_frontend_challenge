"use client";

import { weeks } from "@/app/lib/constants";
import { cn } from "@/app/lib/utils";
import { Dates } from "./date";

export const Content = () => {
    // Check if the day is a weekend
    const isWeekend = (day: string) => {
        return day === "Sat" || day === "Sun";
    }
    return (
        <div className="h-1/2 w-full flex justify-end px-10 py-5">
            <div
                className="grid grid-cols-[repeat(7,1fr)] text-center font-mono gap-5"
            >
                {/* Days of the week */}
                {weeks.map((week, index) => (
                    <div
                        key={index}
                        className={cn(
                            "text-lg",
                            isWeekend(week) && "text-blue-500"
                        )}
                    >
                        {week}
                    </div>
                ))}
                {/* Dates */}
                <Dates />
            </div>
        </div>
    )
}