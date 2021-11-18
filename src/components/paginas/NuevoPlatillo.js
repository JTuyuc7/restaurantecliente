import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {

    //State para la imagen
    const [ subiendo, guardarSubiendo ] = useState(false);
    const [ progreso, guardarProgreso ] = useState(0);
    const [ url, guardarUrl ] = useState('');
    //const [ error, guardarError ] = useState(false);

    //Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);

    // Hook para navegacion react-router-dom v6
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            categoria: '',
            imagen: '',
            descripcion: '',
        },
        validationSchema: yup.object({
            nombre: yup.string().min(3, 'Debe ser mayor de 3 caracterres').required('El nombre es obligatorio'),
            precio: yup.number().min(1, 'Agrega un precio valido').required('El precio es obligatorio'),
            categoria: yup.string().required('Debes seleccionar una categoria'),
            descripcion: yup.string().min(5, 'La descripcion es invalida').required('La descripcion es obligatoria')
        }),
        onSubmit: (platillo) => {
            try {
                platillo.existencia = true;
                platillo.imagen = url;
                firebase.db.collection('productos').add(platillo);

                // Redireccionar al guardar el platillo
                navigate('/menu')
            } catch (error) {
                console.log(error, 'Unable to save data')
            }
        }
    });

    // Funciones para las imagenes
    const handleUploadStart = () => {
        guardarProgreso(0)
        guardarSubiendo(true)
    }
    const handleUploadError = (error) => {
        guardarSubiendo(false)
    }
    const handleUploadSuccess = async ( nombre ) => {
        guardarProgreso(100)
        guardarSubiendo(false)

        // Guardar la imagen enstorage
        const url = await firebase.storage.ref('productos').child(nombre).getDownloadURL();
        guardarUrl(url)
    }
    const handleProgress = (progreso) => {
        guardarProgreso(progreso)
        console.log(progreso, 'progreso')
    }
    return (  
        <>
            <div className="p-5">
                <h2 className="text-2xl font-bold capitalize text-gray-800 text-center">Agrega un nuevo Platillo</h2>

                <div className="flex justify-center mt-10">
                    <div className=" w-full max-w-xl">
                        <form
                            onSubmit={ formik.handleSubmit }
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold"
                                    htmlFor="nombre"
                                >Nombre</label>
                                <input
                                    className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
                                    type="text"
                                    placeholder="Nombre platillo"
                                    style={{ textIndent: 15}}
                                    id="nombre"
                                    value={ formik.values.nombre }
                                    onChange={ formik.handleChange }
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="bg-red-700 rounded-2xl mb-4 p-2 " role="alert">
                                    <p className="text-white text-center font-bold"> Opps!! {formik.errors.nombre}</p>
                                </div>
                            ): null }
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold"
                                    htmlFor="precio"
                                >Precio</label>
                                <input
                                    className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
                                    type="number"
                                    //placeholder="Nombre platillo"
                                    style={{ textIndent: 15}}
                                    id="precio"
                                    min="0"
                                    value={formik.values.precio}
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                />
                            </div>
                            { formik.touched.precio && formik.errors.precio ? (
                                <div className="bg-red-700 rounded-2xl mb-4 p-2" role="alert">
                                    <p className="text-white text-center font-bold">Opps!! {formik.errors.precio}</p>
                                </div>
                            ): null }

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold"
                                    htmlFor="categoria"
                                >Categoria</label>
                                <select
                                    className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
                                    id="categoria"
                                    name="categoria"
                                    value={ formik.values.categoria }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value=""> -- Selecciona -- </option>
                                    <option value="desayuno">Desayuno</option>
                                    <option value="comida">Comida</option>
                                    <option value="cena">Cena</option>
                                    <option value="bebida">Bebida</option>
                                    <option value="postre">Postre</option>
                                    <option value="ensalada">Ensalada</option>
                                </select>
                            </div>
                            { formik.touched.categoria && formik.errors.categoria ? (
                                <div className="bg-red-700 rounded-2xl mb-4 p-2" role="alert">
                                    <p className="text-white text-center font-bold">Opps!! {formik.errors.categoria}</p>
                                </div>
                            ): null }
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold"
                                    htmlFor="imagen"
                                >Imagen</label>
                                <FileUploader
                                    accept="image/*"
                                    id="imagen"
                                    name="imagen"
                                    randomizefilename="true"
                                    storageRef={ firebase.storage.ref('productos')}
                                    onUploadStart={ handleUploadStart }
                                    onUploadError={ handleUploadError }
                                    onUploadSuccess={ handleUploadSuccess }
                                    onProgress={ handleProgress }
                                />
                            </div>
                                { subiendo && (
                                    <div className="h-8 relative w-full border ">
                                        <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-8 flex items-center" style={{ width: `${progreso} %`}}>
                                            {progreso} %
                                        </div>
                                    </div>
                                ) }

                                { url && (
                                    <p className="mb-5 bg-green-600 text-white text-center rounded-3xl uppercase font-bold py-1">Imagen subida</p>
                                )}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold"
                                    htmlFor="descripcion"
                                >Descripcion</label>
                                <textarea
                                    className="shadow appearance-none border rounded-2xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
                                    id="descripcion"
                                    placeholder="Descripcion"
                                    value={ formik.values.descripcion }
                                    onChange={ formik.handleChange }
                                    onBlur={ formik.handleBlur }
                                >

                                </textarea>
                            </div>
                            { formik.touched.descripcion && formik.errors.descripcion ? (
                                <div className="bg-red-700 rounded-2xl mb-4 p-2" role="alert">
                                    <p className="text-white text-center font-bold">Opps!! {formik.errors.descripcion}</p>
                                </div>
                            ): null }
                            <input
                                type="submit"
                                value="Agregar Platillo"
                                className="bg-gray-800 hover:bg-gray-900 block w-full mt-5 text-white h-12 rounded-3xl uppercase font-bold"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NuevoPlatillo;