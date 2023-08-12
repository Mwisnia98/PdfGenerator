import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

interface IColors {
    callback: () => void
}

export const Blur = ({callback} : IColors) => {
    const [blur,setBlur] = useState<number>(0);

    useEffect(() => {
        callback();
    },[blur])

    return (
        <>
            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                <p>Blur deviation</p>
                <Slider defaultValue={0.1} aria-label="Default" valueLabelDisplay="auto" step={1} max={30} min={0} onChange={(e) => setBlur((e.target as any).value as number)}/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}} >
                <filter id="filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
                </filter>
            </svg>
        </>
    )
}