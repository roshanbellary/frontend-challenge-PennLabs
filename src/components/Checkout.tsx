import * as React from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
function Checkout() {
    const { cartString } = useParams();
    console.log(cartString);
    let courses = cartString?.split("-");
    if (courses!=undefined){
        courses.pop();
    }
    console.log(courses);
    let navigator = useNavigate();
    return(
        <Container style={{justifyContent:"center"}}>
            <Row>
                <Col sm={4} style={{display:"flex"}}>
                    <div>

                    </div>
                </Col>
                <Col sm={4} style={{textAlign:"center"}}>
                    <h1>Cart Checkout</h1>
                    {
                        (courses?.map((item)=>(
                            <Card style={{marginTop:"20px", marginBottom:"10px"}}>
                                <Card.Body style={{textAlign:"center"}}>
                                    {item}
                                </Card.Body>
                            </Card>
                        )))
                    }
                    {
                        (courses==undefined)?
                        <h2>
                            No Courses Added to Cart
                        </h2>:
                        <> </>
                    }
                    <Button onClick={()=>navigator(`/`)} variant="primary">
                        Back
                    </Button>
                </Col>
                <Col sm={4} style={{display:"flex"}}>
                    <div/>
                </Col>
            </Row>
        </Container>
    )
}
export default Checkout;