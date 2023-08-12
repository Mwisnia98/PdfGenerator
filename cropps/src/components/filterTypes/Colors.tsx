import { Slider, Stack } from "@mui/material"
import React, { useEffect, useMemo, useState } from "react"

interface IPanelSlider {
    title: string,
    defaultValue: number,
    idRow: number,
    idColumn: number,
    onChange: (value: number) => void, 
}
interface IColors {
    callback: () => void
}

export const PanelSlider = ({title, defaultValue, onChange}: IPanelSlider) => {
    return(
        <Stack spacing={2} direction="column" sx={{ mb: 1 }} alignItems="center">
            <p>{title}</p>
            <Slider defaultValue={defaultValue} aria-label="Default" valueLabelDisplay="auto" step={0.1} max={2} min={-1} onChange={(e) => onChange((e.target as any).value as number)}/>
        </Stack>
    )
}


export const Colors = ({callback} : IColors) => {
    
    const [matrix, setMatrix] = useState<number[][]>([
        [1,0,0,0,0],
        [0,1,0,0,0],
        [0,0,1,0,0],
        [0,0,0,1,0]
    ]);
    const [matrixString, setMatrixString] = useState<string>(null);
    
    const changeMatrix = (idRow: number, idColumn: number, value: number) => {
        matrix[idRow][idColumn] = value;
        setMatrix(matrix)
        setMatrixString(matrix.map(z => z.join(' ')).join(' '));
    }
    

    useEffect(() => {
        callback();

    },[matrixString])

    return (
        <>
            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                <PanelSlider title="Red to red" idRow={0} idColumn={0} defaultValue={1} onChange={(value) => changeMatrix(0,0,value)}/>
                <PanelSlider title="Green to red" idRow={0} idColumn={1} defaultValue={0} onChange={(value) => changeMatrix(0,1,value)}/>
                <PanelSlider title="Blue to red" idRow={0} idColumn={2} defaultValue={0} onChange={(value) => changeMatrix(0,2,value)}/>
                <PanelSlider title="Alpha to red" idRow={0} idColumn={3} defaultValue={0} onChange={(value) => changeMatrix(0,3,value)}/>
                <PanelSlider title="Add to red" idRow={0} idColumn={4} defaultValue={0} onChange={(value) => changeMatrix(0,4,value)}/>
            </div>

            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                <PanelSlider title="Red to green" idRow={1} idColumn={0} defaultValue={0} onChange={(value) => changeMatrix(1,0,value)}/>
                <PanelSlider title="Green to green" idRow={1} idColumn={1} defaultValue={1} onChange={(value) => changeMatrix(1,1,value)}/>
                <PanelSlider title="Blue to green" idRow={1} idColumn={2} defaultValue={0} onChange={(value) => changeMatrix(1,2,value)}/>
                <PanelSlider title="Alpha to green" idRow={1} idColumn={3} defaultValue={0} onChange={(value) => changeMatrix(1,3,value)}/>
                <PanelSlider title="Add to green" idRow={1} idColumn={4} defaultValue={0} onChange={(value) => changeMatrix(1,4,value)}/>
            </div>


            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                 <PanelSlider title="Red to blue" idRow={2} idColumn={0} defaultValue={0} onChange={(value) => changeMatrix(2,0,value)}/>
                <PanelSlider title="Green to blue" idRow={2} idColumn={1} defaultValue={0} onChange={(value) => changeMatrix(2,1,value)}/>
                <PanelSlider title="Blue to blue" idRow={2} idColumn={2} defaultValue={1} onChange={(value) => changeMatrix(2,2,value)}/>
                <PanelSlider title="Alpha to blue" idRow={2} idColumn={3} defaultValue={0} onChange={(value) => changeMatrix(2,3,value)}/>
                <PanelSlider title="Add to blue" idRow={2} idColumn={4} defaultValue={0} onChange={(value) => changeMatrix(2,4,value)}/>
            </div>

            <div style={{display:"flex", justifyContent: 'center', gap: '10px'}}>
                 <PanelSlider title="Red to alpha" idRow={3} idColumn={0} defaultValue={0} onChange={(value) => changeMatrix(3,0,value)}/>
                <PanelSlider title="Green to alpha" idRow={3} idColumn={1} defaultValue={0} onChange={(value) => changeMatrix(3,1,value)}/>
                <PanelSlider title="Blue to alpha" idRow={3} idColumn={2} defaultValue={0} onChange={(value) => changeMatrix(3,2,value)}/>
                <PanelSlider title="Alpha to alpha" idRow={3} idColumn={3} defaultValue={0} onChange={(value) => changeMatrix(3,3,value)}/>
                <PanelSlider title="Add to blue" idRow={3} idColumn={4} defaultValue={1} onChange={(value) => changeMatrix(3,4,value)}/>
            </div>


            <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}} >
                <filter id="filter">
                <feColorMatrix
                    type="matrix"
                    values={matrixString}>
                </feColorMatrix>
                </filter>
            </svg>
        </>
    )
}