import './App.css';

import Nav from './components/Nav';
import Courses from './components/Courses';
import Cart from './components/Cart';
import * as React from 'react';
function App() {
  const [query,setQuery] = React.useState("");
  const [typequery, setTypeQuery] = React.useState(1);
  return (
    <>
      <Nav query={query} setQuery={setQuery}/>
      <div style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '0 calc(1rem + 10%)',
      }}>
        <Courses query={query}/>
        <Cart />
      </div>
    </>
  );
}

export default App;
