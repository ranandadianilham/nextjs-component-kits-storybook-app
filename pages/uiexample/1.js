import { Button, Card, Carousel } from "react-bootstrap";

const First = ({ }) => {

    const items = [{
        title: '',
        desc: '',
        icon: '',
        onClick: ''
    }]

    return (<>
    <Carousel style={{
        width: '60%',
        border: '1px solid red',
        alignSelf: 'center'
    }}>
        <Carousel.Item>
            <ItemCard />
        </Carousel.Item>
        <Carousel.Item>
            <ItemCard />
        </Carousel.Item>
        <Carousel.Item>
            <ItemCard />
        </Carousel.Item>
    </Carousel>
    </>);
}

const ItemCard = ({title = '', desc = '', onClick = () => {}, imgLink = ''}) => {
    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://picsum.photos/100" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </>
}

export default First