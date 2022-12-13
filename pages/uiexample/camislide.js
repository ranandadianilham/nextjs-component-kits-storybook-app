import { useState } from "react"
import { useRef } from "react"
import { useEffect } from "react"


const Camislide = () => {
    const trackRef = useRef(null)
    const [transformX, setTransformX] = useState(0)
    const [imageXpos, setImageXpos] = useState(50)
    const [labelText, setLabelText] = useState('text')
    //https://www.youtube.com/watch?v=PkADl0HubMY
    //hypherplexed
    
    
    let bodyStyle = {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        margin: '0rem',
        overflow: 'hidden'
    }
    
    let imageTrackStyle = {
        display: "flex",
        gap: "4vmin",
        position: "relative",
        left: "50%",
        right: "50%",
        transform: `translate(${transformX}%, ${30}%)`,
    }
    
    let imageStyle = {
        width: "40vmin",
        height: "56vmin",
        objectFit: "cover",
        objectPosition: `${imageXpos}% 50%`,
    }
    
    useEffect(() => {
        if(typeof window !== "undefined") {
            window.onmousedown = (e) => {
                console.log('mouse down', e.clientX)
                if(typeof trackRef.current !== "undefined") {
                    trackRef.current.dataset.MouseDownAt = e.clientX;
                }
            }
            
            window.onmousemove = (e) => {
                console.log('mouse move')
                if(trackRef.current.dataset.MouseDownAt === "0") return;
                
                const mouseDelta = parseFloat(trackRef.current.dataset.MouseDownAt) - e.clientX;
                const maxDelta = window.innerWidth / 2;
                
                const percentage = (mouseDelta / maxDelta) * -100;
                const nextPercentageUnconstrained = parseFloat(trackRef.current.dataset.prevPercentage) + percentage;
                const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
                
                
                trackRef.current.dataset.percentage = nextPercentage;
                setLabelText(nextPercentage);
                //trackRef.current.style.transform = `translate(${nextPercentage}%, 30%)`
                /* trackRef.current.animate({
                    transform: `translate(${nextPercentage}%, 30%)`
                }, {
                    duration: '1200',
                    fill: 'forwards'
                }) */
                setTransformX(nextPercentage)
                setImageXpos(nextPercentage + 100)
                //console.log('percentage', trackRef.current.style)
                if(typeof trackRef.current !== "undefined") {
                    
                }
                
            }
            
            window.onmouseup = (e) => {
                console.log('mouse up')
                if(typeof trackRef.current !== "undefined") {
                    trackRef.current.dataset.MouseDownAt = 0;
                    trackRef.current.dataset.prevPercentage = trackRef.current.dataset.percentage;
                }
            }
        }
    }, [])
    
    
    
    return (<div style={bodyStyle}>
        <h1>{labelText}</h1>
        <div ref={trackRef} style={imageTrackStyle} data-mouse-down-at="0" data-prev-percentage="0">
            <img style={imageStyle} src="/images/unsplash/unsplash1.jpg" draggable="false" />
            <img style={imageStyle} src="/images/unsplash/unsplash2.jpg" draggable="false" />
            <img style={imageStyle} src="/images/unsplash/unsplash3.jpg" draggable="false" />
            <img style={imageStyle} src="/images/unsplash/unsplash4.jpg" draggable="false" />
            <img style={imageStyle} src="/images/unsplash/unsplash5.jpg" draggable="false" />
        </div>
    </div>);
}

export default Camislide;