import { Button, Container, FormControl, InputLabel, MenuItem, Select, Slider } from "@mui/material";
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { Colors } from "./filterTypes/Colors";
import { GrayScale } from "./filterTypes/GrayScale";
import { Invert } from "./filterTypes/Invert";
import { Sepia } from "./filterTypes/Sepia";
import { Blur } from "./filterTypes/Blur";
import { Amplify } from "./filterTypes/Amplify";
import { Sharpen } from "./filterTypes/Sharpen";



export type ITypeFilter = keyof typeof typeFilter;
export const typeFilter = {
    None: 0,
    Colors: 1,
    GrayScale: 2,
    Invert: 3,
    Sepia: 4,
    Blur: 5,
    Amplify: 6,
    Sharpen: 7
} as const;

interface IFilter {
    imageCanvasRef: any;
    setImage:(imgBase64: string) => void;
    setFilter: (imgBase: string) => void;
}

export const Filter = ({imageCanvasRef, setImage, setFilter }: IFilter) => {
    const [type, setType] = useState<number>(typeFilter.None);
    const [filterBase, setFilterBase] = useState<string>(null);
    const matrixColor = (customFunction?:(canvas: HTMLCanvasElement) => void) => {
        imageCanvasRef.$toCanvas({
            beforeDraw: (context,canvas) => {
            context.filter = 'url(#filter)';
            }
        }).then((res) => {
            if(customFunction) customFunction(res);
            var jpegUrl = res.toDataURL("image/jpeg");
            setFilterBase(jpegUrl);
            setImage(jpegUrl);
         })
    }

    useEffect(() => {
        imageCanvasRef.$toCanvas({
            beforeDraw: (context,canvas) => {
            // context.filter = 'grayscale(100%)';
            context.filter = '';
            }
        }).then((res) => {
            var jpegUrl = res.toDataURL("image/jpeg");
            setImage(jpegUrl);
         })
    },[type])




    return (
        <>
            <motion.div className="filter-side-bar" initial={{x:1000, opacity: 0}} animate={{ x:0, opacity: 1}}exit={{x:1000, opacity: 0}} layout  transition={{bounce:0}} >
                <Container fixed>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type filter"
                            onChange={(e) => setType(e.target.value as number)}
                        >
                            {Object.keys(typeFilter).map((z,idx) => 
                                <MenuItem key={idx} value={typeFilter[z]}>{z}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    {
                        type == typeFilter.Colors && <Colors callback={matrixColor} />
                    }
                    {
                        type == typeFilter.GrayScale && <GrayScale callback={matrixColor} />
                    }
                    {
                        type == typeFilter.Invert && <Invert callback={matrixColor} />
                    }
                    {
                        type == typeFilter.Sepia && <Sepia callback={matrixColor} />
                    
                    }
                    {
                        type == typeFilter.Blur && <Blur callback={matrixColor} />
                    }
                    {
                        type == typeFilter.Amplify && <Amplify callback={matrixColor} />
                    }
                    {
                        type == typeFilter.Sharpen && <Sharpen imgCanvas={imageCanvasRef} callback={matrixColor} />
                    }
                    {type != typeFilter.None && <Button onClick={() => setFilter(filterBase)} color="primary" disabled={false} size="medium" variant="outlined" sx={{width:'100%'}}>
                        Save Change
                    </Button>}
                </Container>
            </motion.div>
            
        </>
    )
}