import * as React from 'react';
import {Container, Row, Col, Card, Button, CloseButton} from 'react-bootstrap';
import {Link,  useNavigate} from 'react-router-dom';
import { CourseRep } from '../App';
interface CourseCartProps{
  rep:CourseRep;
  deleteCartListElement :  (dept:string, title:string, num:number) => (void);
};
function Course(props:CourseCartProps){//Defining a course object that appears in the form of a card
  return(
      <Card id="card-team" className="display-flex" style={{height:"50px", marginBottom:"10px"}}  >
        <Card.Body style={{textAlign:"center"}}>
          <Row>
            <Col>
              {props.rep.dept+" "+props.rep.num}
            </Col>
            <Col sm={1}>
              <CloseButton style={{alignItems:"left"}} onClick={()=>{props.deleteCartListElement(props.rep.dept,props.rep.title,props.rep.num)}}/>
            </Col>
          </Row>
        </Card.Body>
      </Card>
  )
}

interface CartProps{
  cartList : CourseRep[];
  deleteCartListElement :  (dept:string, title:string, num:number) => (void);
};  
function Cart (props:CartProps){
  console.log(props.cartList);
  let cartString = ""
  for (let i=0;i<props.cartList.length;i++){
    cartString+=(props.cartList[i].dept+props.cartList[i].num.toString())+"-";
  }
  let navigate = useNavigate();
  return(
    <div style={{
      border: '1px solid rgba(0, 0, 0, 0.1)',
      padding: '1rem',
      marginBottom: '1.5rem',
      borderRadius: '4px',
    }}>
      <Row>
        <Col sm={4}/>
        <Col sm={4} style={{textAlign:"center"}}>
          <h4>Course Cart</h4>
          {props.cartList.map((item)=>(
            <Course rep={{dept:item["dept"], num:item["num"],title:item["title"]}} deleteCartListElement={props.deleteCartListElement} />
          ))}
          <Button variant="primary" onClick={()=>navigate(`checkout/${cartString}`)}>
            Checkout Cart
          </Button>
        </Col>
        <Col sm={4}/>
      </Row>
    </div>
  )
}

export default Cart;
