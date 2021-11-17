import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Menu = () => {
    return (  
        <>
            <div className=" px-10 py-3">
                <h2 className="text-xl font-medium mb-5">Desde Menu</h2>

                <NavLink className="my-10 p-3 bg-blue-800 text-white rounded-xl uppercase" to="/nuevo-platillo">Agregar Platillo</NavLink>
            </div>
        </>
    );
}

export default Menu;