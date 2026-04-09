"use client";

import { useDateStore } from "@/app/store/date.store";

export const Labels = () => {
    const { date, month, year, setMonth, setYear, setDate } = useDateStore();
    const monthLabel = new Date(year, month, 1).toLocaleString("en-US", { month: "long" });

    const syncDateWithinMonth = (nextYear: number, nextMonth: number) => {
        const daysInTargetMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
        const safeDate = Math.min(date, daysInTargetMonth);
        setDate(safeDate);
    };

    const handleMonthChange = (step: number) => {
        const nextMonth = month + step;

        if (nextMonth < 0) {
            const targetYear = year - 1;
            const targetMonth = 11;
            setYear(targetYear);
            setMonth(targetMonth);
            syncDateWithinMonth(targetYear, targetMonth);
            return;
        }

        if (nextMonth > 11) {
            const targetYear = year + 1;
            const targetMonth = 0;
            setYear(targetYear);
            setMonth(targetMonth);
            syncDateWithinMonth(targetYear, targetMonth);
            return;
        }

        setMonth(nextMonth);
        syncDateWithinMonth(year, nextMonth);
    };

    const handleYearChange = (step: number) => {
        const targetYear = year + step;
        setYear(targetYear);
        syncDateWithinMonth(targetYear, month);
    };

    const NavButton = ({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) => (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md p-0 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label={direction === "prev" ? "Previous" : "Next"}
        >
            <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {direction === "prev" ? (
                    <path d="M9.75 3.5L5.25 8L9.75 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                    <path d="M6.25 3.5L10.75 8L6.25 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
            </svg>
        </button>
    );
    return (
        <div className="mt-2 flex items-center justify-center gap-1 rounded-sm bg-zinc-50/60 px-2 py-1.5">
            <div className="grid min-w-38 grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-center">
                <NavButton direction="prev" onClick={() => handleMonthChange(-1)} />
                <span className="flex h-7 min-w-24 items-center justify-center text-center text-base font-semibold leading-none text-zinc-800">{monthLabel}</span>
                <NavButton direction="next" onClick={() => handleMonthChange(1)} />
            </div>
            <div className="grid min-w-30 grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-center">
                <NavButton direction="prev" onClick={() => handleYearChange(-1)} />
                <span className="flex h-7 min-w-14 items-center justify-center text-center text-base font-semibold leading-none text-zinc-800">{year}</span>
                <NavButton direction="next" onClick={() => handleYearChange(1)} />
            </div>
        </div>
    )
}