import React, { useContext, useEffect, useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../UI/Platillo';

const Menu = () => {

    // State para almacenar los platillos
    const [ data, setData ] = useState()

    // Definir el context 
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        obtenerDatos()
    }, []);

    const obtenerDatos = () => {
        try {
            firebase.db.collection('productos').onSnapshot(handleSnapshot)
        } catch (error) {
            console.log(error, 'Unable to retrive data')
        }
    }

    // Manejar real time updated
    const handleSnapshot = (snapshot) => {
        const platillos = snapshot.docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        //console.log(platillos, 'data???')
        // Almacenar en el state
        setData(platillos)
    }

    return (  
        <>
            <div className=" px-10 py-3">
                <h2 className="text-xl font-medium mb-5">Desde Menu</h2>

                <NavLink className="my-10 p-3 bg-blue-800 text-white rounded-xl uppercase mb-4" to="/nuevo-platillo">Agregar Platillo</NavLink>

                { data?.map( (platillo) => (
                    <Platillo
                        platillo={platillo}
                        key={ platillo.id }
                    />
                ))}
            </div>
        </>
    );
}

export default Menu;