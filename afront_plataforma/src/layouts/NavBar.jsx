import React, { useState } from "react";
import { Link } from "react-router-dom";


const NavBar =()=>{

    const [mostrar, setMostrar] = useState(false);
    const [login, setLogin] = useState(false);
  
    const showNav = () => {
      setMostrar(!mostrar);
    };
  
    return (
   <>
   
   </>
        
      );
}

export default NavBar;