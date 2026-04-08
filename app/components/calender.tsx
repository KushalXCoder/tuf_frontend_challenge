import { Content } from "./content/content";

export const Calender = () => {
    const now = new Date();
    const monthLabel = now.toLocaleString("en-US", { month: "long" });
    const yearLabel = now.getFullYear();

    return (
        <section className="relative w-full max-w-md overflow-hidden rounded-sm bg-white">
            <div className="relative h-92 overflow-hidden sm:h-104">
                <img
                    src="/image.avif"
                    alt="Calendar hero visual"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="p-4 sm:p-5">
                <Content />
            </div>
        </section>
    )
}