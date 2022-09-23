import { useState } from "react";
import { Card } from "react-bootstrap";
import CardComponent from "../../components/Card/CardComponent";

const Chat = () => {
    //card
    //item show in card
    const [show, setShow] = useState(false);
    const showPost = () => {
        // toggles posts onclick of button
        setShow(!show);
    };

    return (<>
        <p>maji su</p>
        <CardComponent onClick={showPost} iconSrc={"/icons/icons8-person-80.png"} text={'text'} title={'title'}/>
    </>)
}


export default Chat;