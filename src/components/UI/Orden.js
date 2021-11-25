import React, { useState, useContext} from 'react';
import { FirebaseContext } from '../../firebase';

const Orden = ({ orden }) => {
    
    const [ tiempo, guardarTiempo ] = useState(0);

    const { firebase } = useContext(FirebaseContext);

    const { id, total, completado, tiempoEntrega, } = orden;

    const cambiarTiempoEntrega = async (id) => {
        //console.log('Cmabiando Tiempo', id)

        try {
            firebase.db.collection('ordenes').doc(id).update({
                tiempoEntrega: tiempo
            })
        } catch (error) {
            console.log(error, 'Unable to set time')
        }

        guardarTiempo(0)
    }

    const completarOrden = (id) => {
        //console.log(id, 'orden completa')
        try {
            firebase.db.collection('ordenes').doc(id).update({ completado: true })
        } catch (error) {
            console.log(error, 'Unable to Complete the order')
        }
    }

    return (  
        <>
            <div className="sm:w-1/2 md:w-8/12 lg:w-5/12">
                <div className="p-3 shadow-md bg-white mx-3 my-3 rounded-md text-center h-auto">
                    <h1 className="text-yellow-600 text-lg mb-3">{id}</h1>

                    { orden?.orden.map( (platillos, index) => (
                        <div key={ index }>
                            <p className="text-gray-600 ">{platillos.cantidad} {platillos.nombre}</p>
                        </div>
                    ))}

                    <p className="text-gray-700 font-bold">Total a Pagar: $ {total}</p>

                    {tiempoEntrega === 0 && (
                        <div className="mb-4 mt-4">
                            <label className="block text-green-700 text-sm font-bold mb-2">Tiempo de entrega</label>

                            <input
                                min={1}
                                max={20}
                                type="number"
                                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ej. 15"
                                onChange={ (e) => guardarTiempo(parseInt(e.target.value)) }
                                value={tiempo === NaN ? 0 : tiempo}

                            />

                            <button
                                onClick={ () => cambiarTiempoEntrega(id)}
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 rounded-lg font-bold text-white uppercase"
                            >
                                Agregar Tiempo
                            </button>
                        </div>
                    )}

                    { tiempoEntrega > 0 && (
                        <p className="text-gray-700 mt-14"> Tiempo de entrega:
                            <span className="font-bold">{tiempoEntrega} Minutos</span>
                        </p>
                    ) }

                    { !completado && tiempoEntrega > 0 && (
                        <div className="mt-3">
                            <button
                                onClick={ () => completarOrden(id) }
                                className="bg-blue-700 p-2 rounded-md text-white uppercase font-bold hover:bg-blue-900"
                                type="button"
                            >Marcar como lista</button>
                        </div>
                    ) }
                </div>
            </div>
        </>
    );
}

export default Orden;