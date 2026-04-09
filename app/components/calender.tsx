"use client";

import { useDateStore } from "@/app/store/date.store";
import { Content } from "./content/content";
import { Labels } from "./content/labels";

export const Calender = () => {
    return (
        <section className="relative w-full max-w-md overflow-hidden rounded-sm bg-white">
            <div className="relative h-92 overflow-hidden sm:h-104">
                <img
                    src="/image.avif"
                    alt="Calendar hero visual"
                    className="h-full w-full object-cover"
                />
            </div>
            {/* Month and year labels */}
            <Labels />
            <div className="p-4 sm:p-5">
                <Content />
            </div>
        </section>
    )
}