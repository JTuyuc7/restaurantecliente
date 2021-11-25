import React, { useState, useEffect, useContext } from 'react';
import Orden from '../UI/Orden';
import { FirebaseContext } from '../../firebase';

const Ordenes = () => {

    //State para traer las ordenes
    const [ ordenes, guardarOrdenes ] = useState();

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        obtenerOrdenes()
    },[]);

    const obtenerOrdenes = () => {
        try {
            firebase.db.collection('ordenes').where('completado', '==', false).onSnapshot(manejarSnapshot);
        } catch (error) {
            console.log(error, 'Unable to get the Orders')
        }
    }

    const manejarSnapshot = (snapshot) => {
        let ordenes = snapshot.docs.map( (doc) => {
            return{
                id: doc.id,
                ...doc.data()
            }
        })

        //console.log(ordenes, 'Las ordenes?')
        guardarOrdenes(ordenes)
    }

    return (  
        <>
            <div className="p-10">
                <h1 className="text-3xl uppercase mb-4 font-bold">Ordenes</h1>

                <div className="sm:flex sm:flex-wrap -mx-3">
                    { ordenes?.map( (orden) => {
                        return (
                            <Orden
                                orden={orden}
                                key={orden.id}
                            />
                        )
                    })}
                </div>
            </div>
        </>
    );
}
 
export default Ordenes;