import './App.css';

import Nav from './components/Nav';
import Courses from './components/Courses';
import Cart from './components/Cart';
import * as React from 'react';
export interface CourseRep {//Creating an interface to hold the course parameters
  dept:string;
  title:string;
  num:number;
};
function App() {
  const [query,setQuery] = React.useState("");
  const [cartList, setCartList] = React.useState(Array<CourseRep>());
  const [keyCart, setKeyCart] = React.useState(0);
  function addCartList(dept:string, title:string, num:number){
    if (cartList.length < 7){
      let newVal = cartList;
      let add=true;
      for (let i=0;i<cartList.length;i++){
        if (cartList[i].title==title) add=false;
      }
      if (add){newVal.push({dept:dept, title:title, num:num});setCartList(newVal);setKeyCart(keyCart+1);}
    }
    return 1;
  }
  function deleteCartListElement(dept:string, title:string, num:number){
    let i=0;
    for (;i<cartList.length;i++){
      if (cartList[i].title==title){
        break;
      }
    }
    let newVal = Array<CourseRep>();
    for (let j=0;j<cartList.length;j++){
      if (j==i) continue;
      newVal.push(cartList[j]);
    }
    setCartList(newVal);
    setKeyCart(keyCart+1);
  }
  function checkCartList(title:string){
    let withinList = false;
    for (let i=0;i<cartList.length;i++){
      if (cartList[i].title==title){withinList=true;break;}
    }
    return withinList;
  }
  return (
    <>
      <Nav query={query} setQuery={setQuery}/>
        <div style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '0 calc(1rem + 10%)',
        }}>
        <Courses query={query} addCartList={addCartList} checkCartList={checkCartList}/>
        <Cart key={keyCart} cartList={cartList} deleteCartListElement={deleteCartListElement}/>
      </div>
    </>
  );
}

export default App;
