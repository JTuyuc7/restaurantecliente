import React from 'react';
import { Routes, Route } from 'react-router';

import Ordenes from './components/paginas/Ordenes';
import Menu from './components/paginas/Menu';
import NuevoPlatillo from './components/paginas/NuevoPlatillo';
import SideBar from './components/UI/SideBar';

const App = () => {
  return (  
    <>
      <div className="md:flex min-h-screen">

        <SideBar />

        <div className="md:w-3/5 xl:w-4/5 bg-yellow-300 ">
          <Routes>
            <Route path="/" element={ <Ordenes /> } />
            <Route path="/menu" element={ <Menu />} />
            <Route path="/nuevo-platillo" element={ <NuevoPlatillo />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;