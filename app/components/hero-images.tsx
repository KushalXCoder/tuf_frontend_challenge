"use client";

import { ChangeEvent, useState } from "react";

export const HeroImage = () => {
    const [imageSrc, setImageSrc] = useState("/image.avif");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageSrc(URL.createObjectURL(file));

        // Allow selecting the same image file again.
        e.target.value = "";
    };

    return (
        <div className="relative h-full w-full">
            <label htmlFor="hero-image-input" className="block h-full w-full cursor-pointer">
                <img
                    src={imageSrc}
                    alt="Calendar hero visual"
                    className="h-full w-full object-cover"
                />
            </label>
            <input
                id="hero-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    )
}