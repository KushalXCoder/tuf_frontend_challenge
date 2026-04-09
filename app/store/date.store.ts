import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type DateStore = {
    date: number;
    month: number;
    year: number;
    notesByDate: Record<string, string>;

    setNotesForDate: (date: number, notes: string) => void;
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
            
            setNotesForDate: (date, notes) => set((state) => {
                const dateKey = `${state.year}-${state.month + 1}-${date}`;

                return {
                    notesByDate: {
                        ...state.notesByDate,
                        [dateKey]: notes,
                    },
                };
            }),
            setDate: (date) => set({ date }),
            setMonth: (month) => set({ month }),
            setYear: (year) => set({ year }),
        }),
        {
            name: "date-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ notesByDate: state.notesByDate }),
        }
    )
)