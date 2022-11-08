import React from 'react';

import {
    Routes,
    Route,
  } from "react-router-dom";

  import Inicio from "../pages/Inicio";

export default function Routing() {
    return (
        <Routes>
        <Route path='' element={<Inicio/>} />
        <Route path='' element={<Login/>} />
        <Route path='' element={<Registro/>} />
        <Route path='' element={<Home/>} />
        
      </Routes>

    );
  }