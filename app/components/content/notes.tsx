"use client";

import { useDateStore } from "@/app/store/date.store";

export const Notes = () => {
    const { date, month, year, notesByDate, setNotesForDate } = useDateStore();

    const noteKey = `${year}-${month + 1}-${date}`;
    const currentNote = notesByDate[noteKey] ?? "";

    return (
        <div className="px-5 pt-2">
            <p className="mb-2 text-[10px] font-semibold uppercase text-zinc-600">Notes</p>
            <textarea
                value={currentNote}
                onChange={(e) => setNotesForDate(date, e.target.value)}
                placeholder="Write a short monthly note..."
                spellCheck={false}
                className="h-20 w-full resize-none overflow-y-auto rounded-sm px-0.5 text-xs leading-4 text-zinc-700 outline-none placeholder:text-zinc-400 wrap-anywhere [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            />
        </div>
    )
}