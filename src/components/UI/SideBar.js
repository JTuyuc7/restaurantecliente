import React from 'react'
import { NavLink } from 'react-router-dom';

const SideBar = () => {

    let activeStyle = {
        textDecoration: 'underline',
        backgroundColor: 'white',
        color: '#000',
    }

    return (  
        <>
            <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
                <div className="p-6">
                    <p className="uppercase text-white tracking-wide font-bold">Restaurante Native</p>
                    <p className="text-gray-300 mt-3">Administra tu restaurante</p>

                    <nav className="mt-10">
                        <NavLink style={ ({ isActive }) => isActive ? activeStyle : undefined  } className="text-gray-400 py-1 my-3 hover:bg-white hover:text-gray-500 block text-center rounded-3xl" to="/">Ordenes</NavLink>
                        <NavLink style={ ({ isActive }) => isActive ? activeStyle : undefined  } className="text-gray-400 py-1 my-3 hover:bg-white hover:text-gray-500 block text-center rounded-3xl" to="/menu">Menu</NavLink>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default SideBar;