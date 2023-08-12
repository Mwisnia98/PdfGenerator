import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

interface IColors {
    callback: () => void
}

export const GrayScale = ({callback} : IColors) => {
    const [saturate,setSaturate] = useState<number>(0.1);

    useEffect(() => {
        callback();
    },[saturate])

    return (
        <>
            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                <p>GrayScale saturate</p>
                <Slider defaultValue={0.1} aria-label="Default" valueLabelDisplay="auto" step={0.1} max={1} min={0} onChange={(e) => setSaturate((e.target as any).value as number)}/>
            </div>


            <svg xmlns="http://www.w3.org/2000/svg">
            <filter id="filter">
                <feColorMatrix type="saturate" values={saturate.toString()}/>
            </filter>
            </svg>
        </>
    )
}