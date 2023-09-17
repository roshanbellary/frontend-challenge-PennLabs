import * as React from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
interface SearchBarVals{
  query:string;
  setQuery:  React.Dispatch<React.SetStateAction<string>>
};
function SearchBar(props:SearchBarVals){
  function setInput(val:React.ChangeEvent<HTMLInputElement>){
    props.setQuery(val.target.value);
  }
  return(
      <Container>
        <Row>
          <Col>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                onInput={setInput}
                className="me-2 rounded-pill"
                aria-label="Search"
              />
            </Form>
          </Col>
        </Row>
      </Container>
  )
}
interface NavSet{
  query:string;
  setQuery:  React.Dispatch<React.SetStateAction<string>>
};
function Nav(props:NavSet) {
  return(
    <div style={{
      width: '100%',
      padding: '0 1rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    }}>
      <Container style={{display:"flex"}} fluid>
        <Row style={{width:"100%", marginTop:"10px"}}>
          <Col sm={4}>
            <h2>Penn Course Cart</h2>
          </Col>
          <Col sm={8}>
            <SearchBar query={props.query} setQuery={props.setQuery}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Nav;