"use client";

import { useState } from "react";
import { useDateStore } from "@/app/store/date.store";

type SymbolOptions = {
    value: "dot" | "star" | "flag";
    label: string;
    icon: string;
}[];

export const Marker = () => {
    const { date, month, year, markersByDate, setMarkerForDate, clearMarkerForDate } = useDateStore();
    const [title, setTitle] = useState<string>("");
    const [symbol, setSymbol] = useState<"dot" | "star" | "flag">("dot");
    const symbolOptions: SymbolOptions = [
        { value: "dot", label: "Dot", icon: "●" },
        { value: "star", label: "Star", icon: "★" },
        { value: "flag", label: "Flag", icon: "⚑" },
    ];

    const markerKey = `${year}-${month + 1}-${date}`;
    const existingMarker = markersByDate[markerKey];

    return (
        <div data-preserve-range="true" className="px-0.5 py-1">
            <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Marker ({date})</p>
            </div>

            <div className="mb-2 flex flex-wrap gap-1.5">
                {symbolOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => setSymbol(option.value)}
                        className={`h-7 rounded-sm px-2.5 text-xs font-medium transition-colors ${
                            symbol === option.value
                                ? "bg-zinc-800 text-white"
                                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                        }`}
                    >
                        {option.icon} {option.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto]">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add marker title"
                    className="h-8 rounded-sm bg-zinc-100 px-2.5 text-sm leading-5 text-zinc-700 caret-zinc-700 outline-none placeholder:text-zinc-400 focus:bg-zinc-200"
                />
                <div className="flex items-center justify-end gap-2 sm:justify-start">
                    <button
                        type="button"
                        onClick={() => {
                            if (!title.trim()) return;
                            setMarkerForDate(date, { symbol, title: title.trim() });
                            setTitle("");
                        }}
                        disabled={!title.trim()}
                        className="h-8 min-w-16 rounded-sm bg-zinc-800 px-3 text-xs font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => clearMarkerForDate(date)}
                        className={`h-8 min-w-16 rounded-sm bg-zinc-100 px-2.5 text-xs text-zinc-700 transition-colors hover:bg-zinc-200 ${
                            existingMarker ? "" : "invisible pointer-events-none"
                        }`}
                    >
                        Clear
                    </button>
                </div>
            </div>

            {existingMarker && (
                <p className="mt-2 truncate text-xs text-zinc-500" title={existingMarker.title}>
                    Marker title: {existingMarker.symbol === "dot" ? "●" : existingMarker.symbol === "star" ? "★" : "⚑"} {existingMarker.title}
                </p>
            )}
        </div>
    )
};
