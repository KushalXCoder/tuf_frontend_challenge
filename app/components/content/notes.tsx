"use client";

import { useDateStore } from "@/app/store/date.store";

export const Notes = () => {
    const {
        date,
        month,
        year,
        rangeStart,
        rangeEnd,
        notesByDate,
        notesByRange,
        setNotesForDate,
        setNotesForRange,
    } = useDateStore();

    const noteKey = `${year}-${month + 1}-${date}`;
    const currentNote = notesByDate[noteKey] ?? "";
    const hasRange = rangeStart !== null && rangeEnd !== null;
    const rangeStartValue = hasRange ? Math.min(rangeStart, rangeEnd) : null;
    const rangeEndValue = hasRange ? Math.max(rangeStart, rangeEnd) : null;
    const rangeKey = hasRange
        ? `${year}-${month + 1}-${rangeStartValue}-${rangeEndValue}`
        : "";
    const currentRangeNote = hasRange ? notesByRange[rangeKey] ?? "" : "";

    return (
        <div data-preserve-range="true" className="px-5 pt-2">
            <p className="mb-2 text-[10px] font-semibold uppercase text-zinc-600">
                {hasRange ? `Notes (${rangeStartValue}-${rangeEndValue})` : `Notes (${date})`}
            </p>
            <textarea
                value={hasRange ? currentRangeNote : currentNote}
                onChange={(e) => {
                    if (hasRange && rangeStartValue !== null && rangeEndValue !== null) {
                        setNotesForRange(rangeStartValue, rangeEndValue, e.target.value);
                        return;
                    }

                    setNotesForDate(date, e.target.value);
                }}
                placeholder={hasRange ? "Write a note for this selected range..." : "Write a note for this date..."}
                spellCheck={false}
                className="h-20 w-full resize-none overflow-y-auto rounded-sm px-0.5 text-xs leading-4 text-zinc-700 outline-none placeholder:text-zinc-400 wrap-anywhere [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            />
        </div>
    )
}