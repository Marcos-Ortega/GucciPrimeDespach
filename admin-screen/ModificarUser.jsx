import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'; 
import appFirebase from '../firebase';
import { Picker } from '@react-native-picker/picker';
import Swal from 'sweetalert2';
import { useNavigation } from '@react-navigation/native';
const BD = getFirestore(appFirebase);

export default function ModificarUser(props) {
    const [User, setUser] = useState({ nombre: '', apellido: '', dni: ''});
    const [selectedProvincia, setSelectedProvincia] = useState("default");
    const navigation = useNavigation();
    //Leer el document del usuario
    const getUserById = async (id) => {
        const UserRef = doc(BD, 'users', id);
        const docSnap = await getDoc(UserRef);
        if (docSnap.exists()) {
            setUser(docSnap.data());
        } else {
            console.log("No se encontró el documento del usuario");
        }
    };

    //Recuperar el Id del User
    useEffect(() => {
        if (props.route.params.iduser) {
            getUserById(props.route.params.iduser);
        }
    }, [props.route.params.iduser]);

    //Act. User funcion
    const ActAlum = async () => {
        const UserRef = doc(BD, 'users', props.route.params.iduser);
        try {
            await updateDoc(UserRef, {
                nombre: User.nombre,
                apellido: User.apellido,
                dni: User.dni
            });
            Swal.fire({
                title: 'User actualizado exitosamente',
                icon: 'success',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
        } catch (error) {
            Swal.fire({
                error: 'Error',
                title:'No se pudo modificar el User',
                icon: 'error',                 
                backdrop: false, 
                allowOutsideClick: false 
            })
            console.log(error)
        }
    };

    const style = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        form: {
            margin: 20,
            padding: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 10,
                height: 10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 6,
            elevation: 5,
        },
        backgroundImage: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modificarUser: {
            fontSize: 18,
            fontFamily: 'sans-serif',
            textAlign: 'center'
        },
        cajaIng: {
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 30,
            marginBottom: 10,
            marginTop: 2,
            borderColor: 'white',
        },
        containerButton: {
            width: '100%'
        },
        button: {
            backgroundColor: '#4F76AC',
            borderRadius: 30,
            paddingVertical: 10,
            marginTop: 20,
            width: 150,
            marginHorizontal: 10
        },
        textButton: {
            textAlign: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
        }
    });

    return (
        <ImageBackground
            source={require('../assets/fondoCajas.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.form}>
                <Text style={style.modificarUser}>Modificar User</Text>

                <Text style={{ fontSize: 15 }}>Nombre</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={User.nombre}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setUser({ ...User, nombre: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>Apellido</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={User.apellido}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        onChangeText={(value) => setUser({ ...User, apellido: value })}
                    />
                </View>

                <Text style={{ fontSize: 15 }}>DNI</Text>
                <View style={style.cajaIng}>
                    <TextInput
                        value={User.dni}
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        maxLength={8}
                        onChangeText={(value) => setUser({ ...User, dni: value })}
                    />
                </View>

                <View style={style.containerButton}>
                    <TouchableOpacity style={style.button} onPress={ActAlum}>
                        <Text style={style.textButton}>Modificar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}