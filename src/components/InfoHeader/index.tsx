import React from "react";
import { BiInfoCircle } from "react-icons/bi";

type InfoHeaderProps = {
    text: string;
}

export default function InfoHeader({ text }: InfoHeaderProps) {
    return (
        <div className="text-xs md:text-sm text-blue font-semibold mb-6 flex items-top gap-4 bg-blue-100 p-4 rounded-lg">
            <BiInfoCircle className="text-lg" />
            <span>{text}</span>
        </div>
    )
}