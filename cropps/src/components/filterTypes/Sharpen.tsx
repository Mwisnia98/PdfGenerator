import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

interface IColors {
    imgCanvas: any,
    callback: (customFunction?: (canvas: HTMLCanvasElement) => void) => void
}

export const Sharpen = ({imgCanvas, callback} : IColors) => {
    const [saturate,setSaturate] = useState<number>(0);

    useEffect(() => {
        setFilter();
    },[saturate])

    const setFilter = () => {
        callback(sharpen)
    }

    // const sharpen =  (context, width, height, mix) =>  {
    const sharpen =  (canvas: HTMLCanvasElement) =>  {
        // context, width, height, mix
        let context = canvas.getContext('2d'),
            width = canvas.width,
            height = canvas.height,
            mix = saturate;
        //create an empty element with the given width/height
        let dstData = context.createImageData(width,height),
            dstBuff = new Uint32Array(dstData.data.buffer);        
        //collection of information
        let pixel = context.getImageData(0,0,width,height),
            data = new Uint32Array(pixel.data.buffer);    
        //Everything to work with the matrix
        let kernel = [[0, -1, 0],// matrixа
                     [-1, 5, -1],
                     [0, -1, 0]],
            katet = Math.round(Math.sqrt(kernel.length))+1,//root 9=3
            half = (katet * 0.5) | 0;//3*0.5=1.5 discard values ​​after the decimal point      
        //pixel processing
        let dstIndex = 0;
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              let r = 0, g = 0, b = 0;
              for (let sy = 0; sy < katet; sy++) {
                const yy = Math.min(height - 1, Math.max(0, y + sy - half));
                for (let sx = 0; sx < katet; sx++) {
                  const xx = Math.min(width - 1, Math.max(0, x + sx - half));
                  let pix = data[yy * width + xx];                    
                  r += ((pix & 0xFF) * kernel[sy][sx]);
                  g += ((((pix) >> 8) & 0xFF) * kernel[sy][sx]);
                  b += ((((pix) >> 16) & 0xFF) * kernel[sy][sx]); 
                }
              }        
              let red = Math.min(255,Math.max(0, (r*mix)+((data[y * width + x] )&0xFF)*(1-mix) ))&0xFF;
              let green = Math.min(255, Math.max(0, (g*mix)+(((data[y * width + x])>> 8)&0xFF)*(1-mix) ))&0xFF;
              let blue = Math.min(255, Math.max(0, (b*mix)+(((data[y * width + x])>> 16)&0xFF)*(1-mix) ))&0xFF;
              const alfa = data[y * width + x] & 0xFF000000;
    
              dstBuff[dstIndex++] = red | ((green) << 8) | ((blue) << 16) | alfa | ((blue) << 16);//fill with changes
            }
          }
          context.putImageData(dstData, 0, 0);//overwriting the canvas with new data         
          }

    return (
        <>
            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                <p>Sharpen slider</p>
                <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" step={0.1} max={100} min={0} onChange={(e) => setSaturate((e.target as any).value as number)}/>
            </div>
        </>
    )
}