import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

interface IColors {
    callback: () => void
}

export const Invert = ({callback} : IColors) => {
    const INVERT = [
        -1, 0, 0, 0, 1,
        0, -1, 0, 0, 1,
        0, 0, -1, 0, 1,
        0, 0, 0, 1, 0,
      ];

    useEffect(() => {
        callback();
    },[])

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}} >
                <filter id="filter">
                <feColorMatrix
                    type="matrix"
                    values={INVERT.join(' ')}>
                </feColorMatrix>
                </filter>
            </svg>
        </>
    )
}