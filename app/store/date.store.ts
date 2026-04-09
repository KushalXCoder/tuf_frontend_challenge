import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DateMarker = {
    symbol: "dot" | "star" | "flag";
    title: string;
};

type DateStore = {
    date: number;
    month: number;
    year: number;
    notesByDate: Record<string, string>;
    notesByRange: Record<string, string>;
    markersByDate: Record<string, DateMarker>;
    rangeStart: number | null;
    rangeEnd: number | null;

    setNotesForDate: (date: number, notes: string) => void;
    setNotesForRange: (start: number, end: number, notes: string) => void;
    setMarkerForDate: (date: number, marker: DateMarker) => void;
    clearMarkerForDate: (date: number) => void;
    setRange: (start: number | null, end: number | null) => void;
    clearRange: () => void;
    setDate: (date: number) => void;
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
}

export const useDateStore = create<DateStore>()(
    persist(
        (set) => ({
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            notesByDate: {},
            notesByRange: {},
            markersByDate: {},
            rangeStart: null,
            rangeEnd: null,
            
            setNotesForDate: (date, notes) => set((state) => {
                const dateKey = `${state.year}-${state.month + 1}-${date}`;

                return {
                    notesByDate: {
                        ...state.notesByDate,
                        [dateKey]: notes,
                    },
                };
            }),
            setNotesForRange: (start, end, notes) => set((state) => {
                const rangeStart = Math.min(start, end);
                const rangeEnd = Math.max(start, end);
                const rangeKey = `${state.year}-${state.month + 1}-${rangeStart}-${rangeEnd}`;

                return {
                    notesByRange: {
                        ...state.notesByRange,
                        [rangeKey]: notes,
                    },
                };
            }),
            setMarkerForDate: (date, marker) => set((state) => {
                const dateKey = `${state.year}-${state.month + 1}-${date}`;

                return {
                    markersByDate: {
                        ...state.markersByDate,
                        [dateKey]: marker,
                    },
                };
            }),
            clearMarkerForDate: (date) => set((state) => {
                const dateKey = `${state.year}-${state.month + 1}-${date}`;
                const nextMarkersByDate = { ...state.markersByDate };
                delete nextMarkersByDate[dateKey];

                return {
                    markersByDate: nextMarkersByDate,
                };
            }),
            setRange: (start, end) => set({ rangeStart: start, rangeEnd: end }),
            clearRange: () => set({ rangeStart: null, rangeEnd: null }),
            setDate: (date) => set({ date }),
            setMonth: (month) => set({ month }),
            setYear: (year) => set({ year }),
        }),
        {
            name: "date-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                notesByDate: state.notesByDate,
                notesByRange: state.notesByRange,
                markersByDate: state.markersByDate,
            }),
        }
    )
)