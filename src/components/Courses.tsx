import courses from '../data/courses.json'
import * as React from 'react';
import ReactCardFlip from 'react-card-flip';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import { CourseRep } from '../App';
interface CourseValues {//Creating an interface to hold the course parameters
  dept:string;
  title:string;
  number:number;
  preReqs?:string[];
  crossListed?:string[];
  description: string;
  addCartList : (dept:string, title:string, num:number) => number;
  checkCartList : (title:string) => boolean;
};
function Course(props:CourseValues){//Defining a course object that appears in the form of a card
  let [flipped, setFlipped] = React.useState(false);
  let [addPossible, setAddPossible] = React.useState(true);
  let prereqs = "Prerequisites: ";
  if (props.preReqs!=undefined){
    for (let i=0;i<props.preReqs.length-1;i++){
      prereqs+=(props.preReqs[i]+", ");
    }
    prereqs+=props.preReqs[props.preReqs.length-1];
  }else prereqs = "No Prereqs"; 
  let crosslist = "Crosslisted With: ";
  if (props.crossListed!=undefined){
    for (let i=0;i<props.crossListed.length-1;i++){
      crosslist+=(props.crossListed[i]+", ");
    }
    crosslist+=props.crossListed[props.crossListed.length-1];
  }else crosslist="No Cross Listings";
  function onClick(){
    props.addCartList(props.dept,props.title,props.number);
    setAddPossible(false);
  }
  if (!props.checkCartList(props.title) && addPossible==false) setAddPossible(true);
  return(
    <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
        <Card id="card-team" className="display-flex" style={{height:"320px", overflow:"auto"}}  >
          <Card.Header style={{textAlign:"center"}}>
            {props.dept+" "+props.number}
          </Card.Header>
          <Card.Title style={{textAlign:"center", marginTop:"10px", marginBottom:"10px"}}>
            <p>
              {props.title}
            </p>
          </Card.Title>
          <Card.Body>
            <Card.Text style={{marginBottom:"2px", fontSize:"13px"}}>
                {prereqs} 
            </Card.Text>
            <Card.Text style={{marginBottom:"2px", fontSize:"13px"}}>
                  {crosslist}
            </Card.Text>
            <Row sm={2} style={{marginTop:"20px"}}>
              <Button variant="primary" style={{margin:"auto"}} onClick={()=>setFlipped(!flipped)}>
                See Description
              </Button>
            </Row>
          </Card.Body>
          <Card.Footer style={{textAlign:"center"}}>
            <Col style={{textAlign:"center", margin:"auto"}}>
              <Row sm={1}>
                {addPossible?
                  <Button variant="primary" style={{margin:"auto"}} onClick={onClick}>
                    Add To Cart
                  </Button>:
                  <Button variant="grey" style={{margin:"auto"}}>
                    Added To Cart
                  </Button>
                }
              </Row>
            </Col>
          </Card.Footer>
        </Card>
        <Card id="card-team" className="display-flex" style={{height:"300px",overflowY:"auto"}} >
          <Card.Text style={{marginLeft:"5px", marginRight:"5px"}}>
            {props.description}
          </Card.Text>
          <Card.Footer>
            <Button onClick={()=>setFlipped(!flipped)}>
              Back
            </Button>
          </Card.Footer>
        </Card>
    </ReactCardFlip>
  )
}
interface CoursesProps{
  query: string;
  addCartList : (dept:string, title:string, num:number) => number;
  checkCartList : (title:string) => boolean;
};
function Courses (props:CoursesProps) {
  const [more,setMore] = React.useState(false);
  let filteredData = []
  console.log(props.query);
  if (props.query!=""){
    for (let i=0;i<courses.length;i++){
      if (courses[i]["description"].includes(props.query) || courses[i]["number"].toString().includes(props.query)){
        filteredData.push(courses[i]);
      }
    }
  }else{
    filteredData=courses;
  }
  let filteredCourses= filteredData.map((item)=>(
    <Course key={item["dept"]+"-"+item["number"]} dept={item["dept"]} title={item["title"]} number={item["number"]} 
    preReqs={(typeof(item["prereqs"])=="string")?[item["prereqs"]]:item["prereqs"]} 
    crossListed= {item["cross-listed"]} description={item["description"]}
    addCartList={props.addCartList} checkCartList={props.checkCartList}
    />
  ));
  let currComp = [];// Lines 112-140 is me taking the Courses and structuring them into Rows of 3 
  for (let i=0;i<filteredCourses.length;i+=3){
      let mi = i+3-1;
      if (mi>=filteredCourses.length){
          mi=filteredCourses.length-1;
      }
      let addComp = [];
      for (let j=0;j<=mi-i;j++){
          addComp.push(
              <Col sm={4}>
                  {filteredCourses[i+j]}
              </Col>
          )
      }
      currComp.push(
          <Row className="rows" width="100%" style={{marginTop:"10px", marginBottom:"10px"}}>
              {addComp}
          </Row>
      )
  }
  let orgComp = currComp.length;
  let hiddenComp = currComp;
  if (!more){
      let len = Math.min(currComp.length,2);
      if (orgComp>2){
          hiddenComp=currComp.slice(len+1);
      }
      currComp = currComp.slice(0,len);
  }
  return(
        <>
          {currComp}
          <Container style={{textAlign:"center", marginBottom:"10px"}}>
            <Button variant="primary" id={orgComp<=2?"no-button":"more-button"} onClick={()=>{setMore(!more)}}>
                {more?"Show Less":"Show More"}
            </Button>
          </Container>
        </>
  )
}

export default Courses;