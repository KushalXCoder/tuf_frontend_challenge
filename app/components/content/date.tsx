"use client";

import { cn } from "@/app/lib/utils";
import React, { useEffect } from "react";
import { useDateStore } from "@/app/store/date.store";

export const Dates = () => {
    // Access the setDate function from the date store
    const { month, year, setDate } = useDateStore();

    // Get the current date
    const today = new Date();
    const currentDate = today.getDate();

    // Convert JS weekday (Sun=0..Sat=6) into Monday-first index (Mon=0..Sun=6)
    const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Render only visible cells for current month + leading previous-month fillers
    const arrayLength = daysInCurrentMonth + firstDayOffset;
    
    const [selectedDates, setSelectedDates] = React.useState<number[]>([]);

    // Continuously listen for clicks on the window to reset the selected count
    useEffect(() => {
        if(selectedDates.length <= 0) return;

        const viewClick = (e: MouseEvent) => {
            if(!(e.target as HTMLElement).classList.contains("calender-date")) {
                setSelectedDates([]);
                setDate(currentDate);
            }
        }

        window.addEventListener("click", viewClick);
        return () => window.removeEventListener("click", viewClick);
    });

    // Handle selecting two dates
    const handleClick = (date: number) => {
        // Add dates on click
        setSelectedDates((prev) => {
            // If only one date is selected, store to zustand
            if(prev.length === 0) {
                setDate(date);
            }
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
                const isCurrentMonth = i >= firstDayOffset;
                const date = isCurrentMonth ? i - firstDayOffset + 1 : prevMonthDays - firstDayOffset + i + 1;
                const isSelected = selectedDates.includes(date);
                const isWeekendColumn = i % 7 === 5 || i % 7 === 6;
                const isToday =
                    currentDate === date &&
                    isCurrentMonth &&
                    today.getMonth() === month &&
                    today.getFullYear() === year;

                const inRange =
                    selectedDates.length === 2 &&
                    date > Math.min(selectedDates[0], selectedDates[1]) &&
                    date < Math.max(selectedDates[0], selectedDates[1]);
                return (
                    <div
                        key={i}
                        className={cn(
                            "calender-date flex h-8 w-8 items-center justify-center place-self-center rounded-sm text-[12px] font-medium transition-all duration-150 select-none sm:h-9 sm:w-9",
                            isWeekendColumn && "text-[#1a9fd8]",
                            isToday && "border border-zinc-500 rounded-md",
                            isCurrentMonth ? "text-zinc-800 hover:rounded-sm hover:bg-zinc-100" : "text-zinc-300",
                            isSelected && "rounded-md bg-[#1a9fd8] text-white hover:bg-[#1a9fd8]",
                            inRange && "rounded-sm bg-[#d9f1fb] text-[#0778ad]"
                        )}
                        onClick={() => handleClick(date)}
                    >
                        {date}
                    </div>
                )
            })}
        </>
    )
}