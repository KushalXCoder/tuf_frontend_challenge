"use client";

import { cn } from "@/app/lib/utils";
import React, { useEffect } from "react";

export const Dates = () => {
    // Get the current date
    const currentDate = new Date().getDate();

    // Find the first day of the month
    const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();

    // Check if it a month has 30 or 31 days
    const daysInMonth = (type: string) => {
        const x = type === "current" ? 1 : 0;
        return new Date(new Date().getFullYear(), new Date().getMonth() + x, 0).getDate();
    }

    // Compute the array length here, keeping the JSX cleaner
    const arrayLength = daysInMonth("current") + firstDay;

    
    const [selectedDates, setSelectedDates] = React.useState<number[]>([]);

    // Continuously listen for clicks on the window to reset the selected count
    useEffect(() => {
        if(selectedDates.length <= 0) return;

        const viewClick = (e: MouseEvent) => {
            if(!(e.target as HTMLElement).classList.contains("calender-date")) {
                setSelectedDates([]);
            }
        }

        window.addEventListener("click", viewClick);
        return () => window.removeEventListener("click", viewClick);
    });

    // Handle selecting two dates
    const handleClick = (date: number) => {
        // Add dates on click
        setSelectedDates((prev) => {
            // If, date is selected for the third time, replace with the second date
            if(prev.length === 2) {
                return [prev[0], date];
            }
            return [...prev, date];
        });
    }

    return (
        <>
            {Array.from({ length: arrayLength }, (_,i) => {
                // Calculate the date
                const date = i - firstDay + 2;
                const prevMonthDays = daysInMonth("previous");

                const isCurrentMonth = i + 1 >= firstDay;
                const isSelected = selectedDates.includes(date);
                const isToday = currentDate === date;

                const inRange =
                    selectedDates.length === 2 &&
                    date > Math.min(selectedDates[0], selectedDates[1]) &&
                    date < Math.max(selectedDates[0], selectedDates[1]);
                return (
                    <div
                        key={i}
                        className={cn(
                            "calender-date flex h-8 w-8 items-center justify-center place-self-center rounded-[4px] text-[12px] font-medium transition-all duration-150 select-none sm:h-9 sm:w-9",
                            "nth-[7n-1]:text-[#1a9fd8] nth-[7n]:text-[#1a9fd8]",
                            isToday && "border border-zinc-500 rounded-[6px]",
                            isCurrentMonth ? "text-zinc-800 hover:rounded-[4px] hover:bg-zinc-100" : "text-zinc-300",
                            isSelected && "rounded-[6px] bg-[#1a9fd8] text-white hover:bg-[#1a9fd8]",
                            inRange && "rounded-[4px] bg-[#d9f1fb] text-[#0778ad]"
                        )}
                        onClick={() => handleClick(date)}
                    >
                        {i+1 >= firstDay ? (
                            // This month's date
                            date
                            ) : (
                            // Previous month's date
                            prevMonthDays - firstDay + i + 2
                        )}
                    </div>
                )
            })}
        </>
    )
}