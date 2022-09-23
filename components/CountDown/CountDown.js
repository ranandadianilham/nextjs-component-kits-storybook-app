import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function CountDown({prefix = "Silahkan Tunggu", postfix = "", totalCount = 60}) {
    
    const [second, setSecond] = useState(totalCount);
    
    useEffect(() => {
        setSecond(totalCount);
    },[totalCount]);
    
    useEffect(() => {
        if(second < 0 ) return;
        let timer = setTimeout(() => {setSecond(second-1)}, 1000);
        return () => {
        clearTimeout(timer);
        }
    }, [second])
    
    function display (seconds) {
        const format = (val) => `0${Math.floor(val)}`.slice(-2)
        const hours = seconds / 3600
        const minutes = (seconds % 3600) / 60
      
        return [ hours, minutes, seconds % 60].map(format).join(':')
    }

    return (
        <div className="container">
            <div>{`${prefix}`+" "+display(second)+" "+postfix}</div>
        </div>
    )
}

export default CountDown;