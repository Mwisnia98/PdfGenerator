import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import 'cropperjs';
import { Filter } from './components/Filter';
import { AnimatePresence, motion } from "framer-motion"

interface IApp {
  image: string,
  name: string,
  callback: (string, number) => void
}


export const App = ({image, name,callback} : IApp)  => {
  const buttonResize = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bounding-box" viewBox="0 0 16 16">
  <path d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1v2h2v6h-2v2H5v-2H3V5h2V3h6zm1-2h3v3h-3V1zm3 11v3h-3v-3h3zM4 15H1v-3h3v3zM1 4V1h3v3H1z"/>
</svg>
  const buttonCut = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-scissors" viewBox="0 0 16 16">
  <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61 3.5 3.5zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0zm7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"/>
</svg>;
const button90RightDeg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>;
const button90LeftDeg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
const exitFromCropping = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
<path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
</svg>;


  useEffect(() => {
    const img = new Image()
    img.src = image;
    img.onload = () => {
      if(img.naturalWidth > img.naturalHeight)
      {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const width = 800;
        setWidth(width)
        setHeight(width / aspectRatio);
      }
      else
      {
        const aspectRatio = img.naturalHeight/  img.naturalWidth;
        const height = 800;
        setWidth(height / aspectRatio);
        setHeight(height);
      }
      imageRef.current.$center('cover');
    }
  },[])

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isMoving, setIsMoving] = useState(true);
  const [rotate, setRotate] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [imageBase64, setImageBase64] = useState(image);
  const [imageBase642, setImageBase642] = useState(null);
  
  const MainReset = () => {
    // imageSelectionRef.current.$reset();
    imageRef.current.$resetTransform();
    imageRef.current.$center('cover');
    // imageRef.current.$resetTransform();
    setImageBase64(image)
    setRotate(prev => 0);
  }
    const remove = () => {
        document.getElementById('container').remove();
    }



    const resize = () => {
      setIsMoving(prev => !prev);
    }

    const filter = () => {
      setIsFilter(prev => !prev);
    }
    useEffect(() => {
      if(isFilter)
      {
        imageRef.current.$center('cover');
      }
    },[isFilter])


    const cut = () => {
        imageSelectionRef.current.$toCanvas().then((res) => {
          var jpegUrl = res.toDataURL("image/jpeg");
          callback(jpegUrl,rotate)

          // downloadImage(jpegUrl,"test.jpeg");

          document.getElementById("container").remove();
        });
    }

    const downloadImage = (data, filename = 'untitled.jpeg') => {
      var a = document.createElement('a');
      a.href = data;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
    }
    const rotation = (angle) => {
      imageRef.current.$rotate(`${angle}deg`);
      setRotate(prev => prev += angle);
    }

    const setFilterCanvas = (data: string) => {
      setImageBase64(data);
      setImageBase642(null);
    }


    const imageRef = useRef(null);
    const imageSelectionRef = useRef(null);
    const imageCanvasRef = useRef(null);

    return (
        <div className="backgroud" id='container'>
            <div className="navbar-viewer" >
                <div>{name}</div>
                <div className='button-container'>
                    <button title="resize" className="button" onClick={() => resize()}>{buttonResize}</button>
                    {isMoving && <button className="button" title="filter" onClick={() => filter()}>Filter</button>}

                    {!isMoving  &&
                    <>
                      <button className="button" onClick={() => cut()}>{buttonCut}</button>
                      <button className="button" onClick={() => rotation(-45)}>{button90RightDeg}</button>
                      <button className="button" onClick={() => rotation(45)}>{button90LeftDeg}</button>
                      
                    </>
                    }
                    <button className="button" title="reset" onClick={() => MainReset()}>{exitFromCropping}</button>
                </div>
                <button className="exit-button" onClick={() => remove()}>X</button>

            </div>
            
                 {
                  <cropper-canvas background style={{height:height, width: width}} id='test' ref={imageCanvasRef} disabled={isFilter}>
                <cropper-image src={imageBase64} alt="Picture" sizes={`${width}px ${height}px`} ref={imageRef}></cropper-image>
                { imageBase642 && <cropper-image src={imageBase642} alt="Picture" sizes={`${width}px ${height}px`} ></cropper-image>}
                <cropper-handle action="select" plain></cropper-handle>
                {isMoving ? <cropper-handle action="move" plain></cropper-handle> :
                  <>

                  <cropper-selection initial-coverage="0.5" movable resizable zoomable translatable ref={imageSelectionRef}>

                    {/* <cropper-grid role="grid" covered></cropper-grid> */}
                    <cropper-crosshair centered></cropper-crosshair>
                      <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>
                      <cropper-handle action="n-resize"></cropper-handle>
                      <cropper-handle action="e-resize"></cropper-handle>
                      <cropper-handle action="s-resize"></cropper-handle>
                      <cropper-handle action="w-resize"></cropper-handle>
                      <cropper-handle action="ne-resize"></cropper-handle>
                      <cropper-handle action="nw-resize"></cropper-handle>
                      <cropper-handle action="se-resize"></cropper-handle>
                      <cropper-handle action="sw-resize"></cropper-handle>
                  </cropper-selection>
                </>
                }
              </cropper-canvas>
              }
              <AnimatePresence>
              {
                isFilter && <Filter imageCanvasRef={imageCanvasRef.current} setImage={(img) => setImageBase642(img)} setFilter={setFilterCanvas}/>
              }
              </AnimatePresence>
              
            
            </div>

            
        // </div>
    )
}


declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cropper-canvas': any;
      'cropper-image': any;
      'cropper-handle': any
      'cropper-selection': any
      'cropper-crosshair': any
    }
  }
}

export default App;

