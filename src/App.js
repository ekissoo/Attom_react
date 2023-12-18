import logo from './logo.svg';
import React from 'react';

import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPlus, faEdit, faCamera, faList } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import About from './components/About';
import Form from './components/Form'
import { useState } from 'react';

function App() {
  const [results, setResults] = useState([]);
  const [a,setA] = useState("");
  // setA("hello");

  return (
    <div className="App" style={{
      // display: 'felx',
      alignItems: 'center',
      overflowY: 'auto'
    }}>

      <div style={{ backgroundImage: "url(/atom2.jpg)",
                    backgroundRepeat: 'no-repeat',
                    position: 'absolute',
                    // overflowY: 'scroll',
                    // maxHeight: '100vh',

                    backgroundSize:'cover', minHeight:'100vh',minWidth:'100%'
                  }}>

          
          <Router>
      
          <Navbar></Navbar>
          <div className='container' style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Switch>
            <Route path= '/' exact component={Home}></Route>
            <Route path= '/about' exact component={About}></Route>
            <Route path= '/form' 
            render={(props)=><Form {...props} isAuthed={true} a= {"a"}/>}></Route>
            </Switch>

          </div>
          </Router>
        
      </div>
    </div>

  );
}

export default App;
