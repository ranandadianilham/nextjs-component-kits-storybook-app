import { Col, Image, Navbar, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardComponent = ({ iconSrc, alignment, className, title = '', text = '', children, ...props }) => {
    const styles = {
        width: '18rem',
        border: '1px solid red'
    }

    return (<div className='d-flex justify-content-around'>
        <Card className={`${className}`} style={styles} {...props}>
            <Card.Body>
                <Navbar bg="light" expand="sm">
                    <Card.Title>{title}</Card.Title>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary">Left</button>
                        <button type="button" className="btn btn-secondary">Middle</button>
                        <button type="button" className="btn btn-secondary">Right</button>
                    </div>
                </Navbar>
                <Col>
                    <Row>
                        <Col>
                            <Image className='col-md-4' src={iconSrc} width={20} alt={'icon'}/>
                        </Col>
                        <Col  className='col-md-4'>
                            <p>Playstation</p>
                            <p>bottom text</p>
                        </Col>
                        <Col  className='col-md-4'>
                            -$89.99
                        </Col>
                    </Row>
                </Col>
            </Card.Body>
        </Card>
    </div>)
}

export default CardComponent;