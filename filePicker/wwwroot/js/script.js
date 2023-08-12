



function test(base64,name) {
    const root = ReactDOM.createRoot(document.getElementById('react'));
    root.render(React.createElement(LikeButton,{img: base64,name: name}));
}


function LikeButton(props) {
    const [svg, setSVG] = React.useState(false);
    const funcToDotNet = () => {
        DotNet.invokeMethodAsync('filePicker',"CheckFunction")
            .then(data => {
                console.log(data);
            });
    }
    const remove = () => {
        console.log(props)
        document.getElementById('react').firstChild.remove();
    }

    const resize = () => {
        setSVG(true);
        document.querySelector('.viewer-container').classList.add()

    }
    const refSvg = React.createRef();

    return (
        <div className="backgroud">
            <div className="navbar-viewer">
                <div>{props.name}</div>
                <div>
                    <button title="resize" className="button" onClick={() => resize()}><i class="bi bi-bounding-box"></i></button>
                </div>
                <button className="exit-button" onClick={() => remove()}>X</button>

            </div>
            <div className={`viewer-container`}>
                <img src={props.img} alt="" width="600" />
                {svg && <div className="shadow">
                        <div className="cropping" style={{width: '100%', height:'100%'}}>
                            <div className="cropping-dot dot-nw"></div>
                            <div className="cropping-dot dot-ne"></div>
                            <div className="cropping-dot dot-sw"></div>
                            <div className="cropping-dot dot-se"></div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

