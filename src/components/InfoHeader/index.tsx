import React from "react";
import { BiInfoCircle } from "react-icons/bi";

type InfoHeaderProps = {
    text: string;
}

export default function InfoHeader({ text }: InfoHeaderProps) {
    return (
        <div className="text-sm text-blue font-semibold flex items-center gap-2 bg-blue-100 p-2 md:p-3 rounded">
            <BiInfoCircle className="text-base" />
            <span>{text}</span>
        </div>
    )
}