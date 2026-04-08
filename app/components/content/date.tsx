"use client";

import { cn } from "@/app/lib/utils";
import React, { useEffect, useMemo } from "react";

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
                            "calender-date flex justify-center items-center nth-[7n-1]:text-blue-500 nth-[7n]:text-blue-500 px-2",
                            isToday && "bg-zinc-600 rounded",
                            isCurrentMonth ? "text-white hover:bg-zinc-800 hover:rounded" : "text-gray-500",
                            isSelected && "bg-blue-500 rounded text-white",
                            inRange && "bg-blue-300 rounded text-white"
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