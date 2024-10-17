import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import appFirebase from '../firebase';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const auth = getAuth(appFirebase)
const BD = getFirestore(appFirebase)

export default function Register() {
    //Estado para el picker de seleccionar año
    const [selectedProvincia, setSelectedProvincia] = useState("default");
    //Constante para usar navigate 
    const navigation = useNavigation();
    //Constante para el estado de la contraseña (ver/ocultar)
    const [passwordVisible, setPasswordVisible] = useState(false);
    //Almacena los valores ingresados
    const [state, setState] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        password: "",
        rol: "2"
    })
    //Funcion para alternar entre ver/ocultar contraseña
    const verPassword = () => {
        setPasswordVisible(!passwordVisible);
    };
    //Captura el texto ingresado y actualiza a el estado de la constante donde se almacenan los valores
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    //Funcion para crear cuenta
    const handleCreateAccount = async () => {
        //Alertas dependiendo del estado de los campos (Si es que estan vacios o por defecto.)
        if (state.nombre === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su nombre',
                icon: 'warning',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.apellido === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su apellido',
                icon: 'warning',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.dni === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su dni',
                icon: 'error',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.email === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese su email',
                icon: 'error',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (state.password === '') {
            Swal.fire({
                title: 'ERROR',
                text: 'Ingrese una contraseña',
                icon: 'error',
                backdrop: false, 
                allowOutsideClick: false 
            })
        } else if (selectedProvincia === 'default') {
            Swal.fire({
                title: 'ERROR',
                text: 'Seleccione una provincia',
                icon: 'warning',
                backdrop: false, 
                allowOutsideClick: false 
            });
        }
        //Si los campos estan bien pasa esto
        else {
            try {
                //Crea el usuario con la contraseña en firebase
                const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
                const user = userCredential.user;
                //Guadra los datos del usuario en un documento de la coleccion de users
                await setDoc(doc(BD, 'users', user.uid), {
                    nombre: state.nombre,
                    apellido: state.apellido,
                    dni: state.dni,
                    email: state.email,
                    rol: state.rol,
                    provincia: selectedProvincia
                });
                Swal.fire({
                    title: 'Cuenta Creada Exitosamente',
                    icon: 'success',
                    timer: '2000',
                    backdrop: false, 
                    allowOutsideClick: false 
                })
                navigation.navigate('Login')
            }
            catch (error) {
                //Por si hay algun error con la auth de firebase, muestra el error al usuario.
                const CodigoError = error.code;
                if (CodigoError == 'auth/email-already-in-use')
                    Swal.fire({
                        title: 'Error',
                        text: 'El Email ya esta en uso',
                        icon: 'error',
                        backdrop: false, 
                        allowOutsideClick: false 
                    })
                else if (CodigoError == 'auth/invalid-email')
                    Swal.fire({
                        title: 'Error',
                        text: 'Email Invalido. Ejemplo de email requerido: TuCorreo@example.com',
                        icon: 'error',
                        backdrop: false, 
                        allowOutsideClick: false 
                    })
                else if (CodigoError == 'auth/weak-password')
                    Swal.fire({
                        title: 'Error ',
                        text: 'La contraseña debe tener minimo 6 digitos',
                        icon: 'warning',
                        backdrop: false, 
                        allowOutsideClick: false 
                    })
            };
        }

    }
    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {
            padding: 15,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            width: 'auto',
            boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.5)',
        },
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 10,
            marginTop: 2
        },
        containerButton: {
            alignItems: 'center'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        },
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tituloRegistrarse: {
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: '1em',
            paddingBottom: 10
        },
        cajaIngPass: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginTop: 2,
            marginBottom: 10,
            flexDirection:'row',
            alignItems: 'center',
            paddingHorizontal: 15
        },
        picker:{
            height: 45,
            marginBottom: 5,
            borderColor: '#fff',
            borderWidth: 1,
            borderRadius: 10
        }
    });
    return (
        <ImageBackground
            source={require('../assets/fondoCajas.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.form}>
                <Text style={style.tituloRegistrarse}>REGISTRARSE</Text>

                <Text style={{ fontSize: 12 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='Nombre'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('nombre', value)}
                    />
                </View>

                <Text style={{ fontSize: 12 }}>Apellido</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='Apellido'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('apellido', value)}
                    />
                </View>

                <Text style={{ fontSize: 12 }}>DNI</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='DNI'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        maxLength={8}
                        onChangeText={(value) => handleChangeText('dni', value)}
                    />
                </View>

                <Text style={{ fontSize: 12 }}>Provincia</Text>
                <Picker
                    selectedValue={selectedProvincia}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedProvincia(itemValue)
                    }
                    style={style.cajaIng}
                >
                    <Picker.Item label="Seleccione su provincia" value="default" />
                    <Picker.Item label="Buenos Aires" value="Buenos Aires" />
                    <Picker.Item label="CABA" value="CABA" />
                    <Picker.Item label="Catamarca" value="Catamarca" />
                    <Picker.Item label="Chaco" value="Chaco" />
                    <Picker.Item label="Chubut" value="Chubut" />
                    <Picker.Item label="Cordoba" value="Cordoba" />
                    <Picker.Item label="Neuquen" value="Neuquen" />
                    <Picker.Item label="Jujuy" value="Jujuy" />
                    <Picker.Item label="La Pampa" value="La Pampa" />
                    <Picker.Item label="La Rioja" value="La Rioja" />
                    <Picker.Item label="Rio Negro" value="Rio Negro" />
                    <Picker.Item label="Salta" value="Salta" />
                    <Picker.Item label="San Juan" value="San Juan" />
                    <Picker.Item label="Santa Cruz" value="Santa Cruz" />
                    <Picker.Item label="Tierra Del Fuego" value="Tierra Del Fuego" />
                    <Picker.Item label="Tucuman" value="Tucuman" />
                    <Picker.Item label="Corrientes" value="Corrientes" />
                    <Picker.Item label="Entre Rios" value="Entre Rios" />
                    <Picker.Item label="Formosa" value="Formosa" />
                </Picker>

                <Text style={{ fontSize: 12 }}>E-Mail</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        placeholder='TuCorreo@example.com'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => handleChangeText('email', value)}
                    />
                </View>


                <Text style={{ fontSize: 12 }}>Contraseña</Text>
                <View style={style.cajaIngPass}>
                    <TextInput
                        placeholder='Contraseña'
                        secureTextEntry={!passwordVisible} //Dependiendo del estado se va a ver/ocultar la contraseña
                        onChangeText={(value) => handleChangeText('password', value)}
                        style={{ flex:1, outline: 0 }}
                    />
                    {/*boton para ver el icono del ojo*/}
                    <TouchableOpacity onPress={verPassword}>
                        <Icon name={passwordVisible ? 'eye-off' : 'eye'} size={24} /> 
                    </TouchableOpacity>
                </View>

                <View style={style.containerButton}>
                    <TouchableOpacity
                        style={style.button}
                        onPress={handleCreateAccount}
                    >

                        <Text style={style.textButton}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );

}