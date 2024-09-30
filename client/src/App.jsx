import { useState, useEffect } from 'react'
import './App.css'
import { Menu } from './components/Menu.jsx'
import { Site } from './components/Site.jsx'
import axios from "axios";

function App() {
  const [isLogedIn,setIsLogedIn] = useState(false);
  const [username,setUsername] = useState("");
  const checkLogedIn = async () => {
    console.log(1);
    const res = await axios.get("http://localhost:8080/auth/logedIn",{withCredentials: true});
    setIsLogedIn(res.data.isLogedIn);
    setUsername(res.data.username);
  }
  const logIn = () => {
    axios.get("http://localhost:8080/auth/logIn",{withCredentials: true});
  }
  return (
    <>
      <Menu/>
      <Site/>
    </>
  )
}

export default App