// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';


// export default class ReactTest {

//   testing() {
//     const root = ReactDOM.createRoot(document.getElementById('root'));
//     const callback = (str) => {
//     }
//     const name = "wiewior";
//     const  convertImageToBase64 = (imgUrl, callback) =>  {
//       const image = new Image();
//       image.crossOrigin='anonymous';
//       image.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
//         canvas.height = image.naturalHeight;
//         canvas.width = image.naturalWidth;
//         ctx.drawImage(image, 0, 0);
//         const dataUrl = canvas.toDataURL();
//         callback && callback(dataUrl)
//       }
//       image.src = imgUrl;
//     }
//      convertImageToBase64("./wiewiorka.jpg",(str) => {
//       root.render(
//         <React.StrictMode>
//           <App callback={(str,rotate) => callback(str,rotate)} image={str} name={name}/> 
//         </React.StrictMode>
//       );
//     })
//   }

//   render(callback, image,name) {
//     const root = ReactDOM.createRoot(document.getElementById('root'));
      
//       root.render(
//         <React.StrictMode>
//           <App callback={(str,rotate) => callback(str,rotate)} image={image} name={name}/> 
//         </React.StrictMode>
//       );  
//   }
// }
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//   // dev code
//   var a = new ReactTest();
//   a.testing();
// } else {
//   // production code
// }




// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// //reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export function testing() {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      const callback = (str) => {
      }
      const name = "wiewior";
      const  convertImageToBase64 = (imgUrl, callback) =>  {
        const image = new Image();
        image.crossOrigin='anonymous';
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.height = image.naturalHeight;
          canvas.width = image.naturalWidth;
          ctx.drawImage(image, 0, 0);
          const dataUrl = canvas.toDataURL();
          callback && callback(dataUrl)
        }
        image.src = imgUrl;
      }
       convertImageToBase64("./wiewiorka.jpg",(str) => {
        root.render(
          <React.StrictMode>
            <App callback={(str,rotate) => callback(str,rotate)} image={str} name={name}/> 
          </React.StrictMode>
        );
      })
    }
  
export function render(objRefDotNet, image,name) {
      const reactapp = document.createElement("div");
      reactapp.id = "root";
  
      document.body.appendChild(reactapp);
      const root = ReactDOM.createRoot(document.getElementById('root'));
      

        root.render(
          <React.StrictMode>
            <App callback={(str,rotate) => objRefDotNet.invokeMethodAsync('ChangedImageFromZoom', str,name)} image={image} name={name}/> 
          </React.StrictMode>
        );  
}



