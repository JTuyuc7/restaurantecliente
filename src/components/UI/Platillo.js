import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Platillo = ({ platillo }) => {

    // Existencia ref para acceder al valor directamente
    const existenciaRef = useRef( platillo.existencia)

    // Context de firebase para cambios en la DB
    const { firebase } = useContext(FirebaseContext);

    const { id, categoria, descripcion, imagen, existencia, nombre, precio } = platillo;

    // Modificar el estado del platillo
    const actuaizarDisponibilidad = () => {

        const existencia = (existenciaRef.current.value === "true") // cambiar un string "true" / "false" a un booleano
        
        try {
            firebase.db.collection('productos').doc(id).update({ existencia: existencia });
        } catch (error) {
            console.log(error, 'Unable to change the availability')
        }
    }

    return (  
        <>
            <div className="w-full px-3 mb-4 mt-10">
                <div className="p-5 shadow-md bg-white">
                    <div className="lg:flex">
                        <div className="lg:w-5/12 xl:w-3/12">
                            <img
                                src={ imagen }
                                alt="Imagen-platillo"
                            />

                            <div className="sm:flex sm:-mx-2 mt-3 ">
                                <label className="block sm:w-2/4">
                                    <span className="block text-gray-800 mb-2 ">Existencia</span>

                                    <select 
                                        className="shadow appearance-none border rounded w-full py-1 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                        value={ existencia }
                                        ref={existenciaRef}
                                        onChange={ () => actuaizarDisponibilidad() }
                                    >
                                        <option value="true">Disponible</option>
                                        <option value="false">No disponible</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="lg:w-7/12 lg:w-9/12 px-4">
                            <p className="font-bold text-2xl text-yellow-600 mb-4">{ nombre }</p>
                            <p className="text-gray-700 mb-3">Categoria: <span className="text-gray-700 font-bold">{categoria.toUpperCase()}</span></p>

                            <p className="text-gray-700 mb-3">{descripcion}</p>
                            <p className="text-gray-700 mb-3">Precio: <span className="text-gray-700 font-bold">Q {precio.toFixed(2)}</span></p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Platillo;