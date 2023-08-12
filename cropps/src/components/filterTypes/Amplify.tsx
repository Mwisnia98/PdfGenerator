import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

interface IColors {
    callback: () => void
}
interface IChannelProps {
    callback:(result: IChannelResult) => void,
    title: string
}
interface IChannelResult {
    exponent:number,
    amplitude:number,
    offset:number
}

const Channel = ({callback, title}:IChannelProps) => {
    const [exponent,setExponent] = useState<number>(1);
    const [amplitude,setAmplitude] = useState<number>(1);
    const [offset,setOffset] = useState<number>(0);
    useEffect(() => {
        callback({exponent,amplitude,offset})
    },[exponent,amplitude,offset])

    return (
        <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
            <p>{title}</p>
            <div>
                <p>Exponent</p>
                <Slider defaultValue={1} aria-label="Default" valueLabelDisplay="auto" step={0.1} max={10} min={-10} onChange={(e) => setExponent((e.target as any).value as number)}/>
            </div>
            <div>
                <p>Amplitude</p>
                <Slider defaultValue={1} aria-label="Default" valueLabelDisplay="auto" step={0.1} max={10} min={-10} onChange={(e) => setAmplitude((e.target as any).value as number)}/>
            </div>
            <div>
                <p>Offset</p>
                <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" step={0.1} max={10} min={-10} onChange={(e) => setOffset((e.target as any).value as number)}/>
            </div>
        </div>
    )
}

export const Amplify = ({callback} : IColors) => {
    const [R,setR] = useState<IChannelResult>({exponent:1,amplitude:1,offset:0});
    const [G,setG] = useState<IChannelResult>({exponent:1,amplitude:1,offset:0});
    const [B,setB] = useState<IChannelResult>({exponent:1,amplitude:1,offset:0});
    useEffect(() => {
        callback();
    },[R,G,B])
    useEffect(() => {
        callback();
    },[])

    return (
        <>
            <div style={{display:"flex", justifyContent: 'center', gap: '10px', flexDirection:'column'}}>
                <Channel title="R" callback={(r) => setR(r)}/>
                <Channel title="B" callback={(r) => setG(r)}/>
                <Channel title="G" callback={(r) => setB(r)}/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}} >
                <filter id="filter">
                    <feComponentTransfer>
                        <feFuncR type="gamma" exponent={R.exponent} amplitude={R.amplitude} offset={R.offset} />
                        <feFuncG type="gamma" exponent={G.exponent} amplitude={G.amplitude} offset={G.offset} />
                        <feFuncB type="gamma" exponent={B.exponent} amplitude={B.amplitude} offset={B.offset} />
                    </feComponentTransfer>
                </filter>
            </svg>
        </>
    )
}