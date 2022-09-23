import { Component, Fragment, useEffect, useRef, useState } from "react";

function Video({src = "/video1.mp4"}) {
    const [windowWidth, setWindowWidth] = useState(0)
    const [randomtext, setRandomtext] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [currentNumber, setCurrentNumber] = useState(0);
    const [totalPlayTime, setTotalPlayTime] = useState(0);
    const videoPlayer = useRef(null)
    const videoProgress = useRef(null);
    const handleResize = () => {setWindowWidth(window.innerWidth)}
    
    useEffect(() => {
       let videocomponent = videoPlayer.current;
       videocomponent.volume = 0.1;
       setTotalPlayTime(videocomponent.duration);
    }, [])
    
    useEffect(() => {
        //cannot use variable
        if (videoPlayer.current && !videoPlayer.current.paused) {
            setInterval(function () {
                setCurrentNumber(videoPlayer.current?.currentTime);
            });
        } else {
        }
        return () => {
            clearInterval();
        }
    }, [isPaused])
    
    
    useEffect(() => {
        //progress number running due to currentNumber keep updating
        console.log('updated to new ', currentNumber);
       // videoPlayer.current = currentNumber
    }, [currentNumber])
    
    
    
    useEffect(() => {
        let currentVideo = videoPlayer.current;
        currentVideo.pause();
        setIsPaused(true);
        setCurrentNumber(randomtext);
    }, [randomtext]);
    
   
    const togglePlayPause = () => {
        let currentVideo = videoPlayer.current;
        if(currentVideo.paused) {
            currentVideo.play();
            setIsPaused(false);
            
        }else {
            currentVideo.pause();
            setIsPaused(true);
        }
    }
    
    const onPlayHandle = () => {
        //if play, start progress
        console.log('video played', isPaused);
        setIsPaused(!isPaused);
    }
    
    return (
        <div className="d-flex justify-content-center "
                style={{
                    width: "50%"
                }}
            >
                <p className=""> {totalPlayTime} </p>
                {/* <p>{videoPlayer.current?.currentTime}</p> */}
                <p>{currentNumber}</p>
                <p>is muted ? {videoPlayer.current?.muted}</p>
                <figure>
                    <video ref={videoPlayer} /* controls */ poster="/404.jpg" className=""  
                    onPlay={() => {onPlayHandle()}}
                    style={{ 
                        objectFit: "fill",
                        width: '720px',
                        height: '405px', 
                        borderRadius: "4px"
                    }}>
                        <source /* src="/blue.mp4#t=2" */ src={src} /* src={src} */  />
                    </video>
                    <div id="video-controls" className="controls tutorial-video-control" data-state="hidden">
                        <div>
                            <button id="playpause" type="button" onClick={() => {togglePlayPause()}} data-state="play">Play/Pause</button>
                            <button id="stop" type="button" onClick={() => {videoPlayer.current.volume = videoPlayer.current.volume === 0 ? 0.1 : 0.0}} data-state="stop">Mute On/Off</button>
                        </div>
                        <div className="progress">
                            <label style={{color: 'white'}}>{Math.floor(currentNumber)}</label>
                            <progress ref={videoProgress} id="progressbar" value={Math.floor((currentNumber / videoPlayer.current?.duration) * 100)} min="0" max='100'>
                            </progress>
                            <label id="timer" style={{color: 'white'}}>{videoPlayer.current?.duration}</label>
                        </div>
                        <div>
                            <button id="fs" type="button" data-state="go-fullscreen">Fullscreen</button>
                        </div>
                    </div>
                    
                </figure>
                <div>
                    {/* <div className="progress-container d-flex" >
                        <Col className="progressbar">
                            <div className="circleBase progressbarpointer">x</div>
                        </Col>
                        
                    </div> */}
                    {/* 
                        when point is toucher/drag. stop the video and let video follow
                    */}
                    <p>{randomtext}</p>
                    <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    defaultValue={Math.floor((currentNumber / videoPlayer.current?.duration) * 100) }
                    onChange={(e) => {
                        setRandomtext(e.target.value);
                    }}
                    ></input>
                </div>
            </div>
    )
}

export default Video;