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
        <div className="grid gap-4">
            <div className="grid grid-cols-[repeat(7,1fr)] gap-1 text-center font-mono">
                {/* Days of the week */}
                {weeks.map((week, index) => (
                    <div
                        key={index}
                        className={cn(
                            "pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-700",
                            isWeekend(week) && "text-[#1a9fd8]"
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