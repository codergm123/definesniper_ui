import './App.css';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import configure from './util/configure';

function App() {

  useEffect( async () => {

    configure()
    
  }, [])

  return (
    <div className="App" style={{backgroundColor: 'white', color: 'black', height: '100%'}}>
      
    </div>
  );
}

export default App;
