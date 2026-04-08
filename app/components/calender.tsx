import { Content } from "./content/content"

export const Calender = () => {
    return (
        <div className="min-w-2xl h-200 border">
            {/* Image */}
            <div className="h-1/2">
                <img
                    src="/image.avif"
                    alt="Hero-Image"
                    className="size-full"
                />
            </div>
            {/* Content */}
            <Content />
        </div>
    )
}