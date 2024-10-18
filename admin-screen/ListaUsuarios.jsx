import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements';
import { collection, onSnapshot, getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebase';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModificarUser from './ModificarUser';
import Icon from 'react-native-vector-icons/FontAwesome';
const BD = getFirestore(appFirebase);

export default function Listausers() {
    const [users, setusers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const usersCollection = collection(BD, 'users');
        const users = onSnapshot(usersCollection, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                const { nombre, apellido, dni, provincia, rol } = doc.data();
                if (rol === '2') { // Solo carga los users con rol 2
                    users.push({
                        id: doc.id,
                        nombre,
                        apellido,
                        dni,
                        provincia,
                        rol
                    });
                }
            });
            setusers(users);
        });

        return () => users();
    }, []);

    const eliminaruser = async (id) => {
        const userRef = doc(BD, 'users', id);
        await deleteDoc(userRef);
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
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modificaruser: {
            fontSize: 20,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            marginBottom: 5
        },
        scrollView: {
            height: 300,
            overflowY: 'auto'
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        userContainer: {
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexDirection:'column',
            alignCenter: 'center',
            justifyContent: 'center',
            height: '12vh',
        },
        basura: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -12 }, { translateY: -12 }],
            width: 24,
            height: 24
        }
    });

    return (
        <ImageBackground
            source={require('../assets/fondoCajas.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.modificaruser}>LISTA DE USUARIOS</Text>
                    <View style={style.scrollView}>
                        {users.map((user) => (
                            <View style={style.userContainer} key={user.id}>
                                <ListItem bottomDivider 
                                    onPress={() =>
                                        navigation.navigate('ModificarUser', {
                                            iduser: user.id
                                        })
                                    }
                                >
                                    <ListItem.Chevron />
                                    <ListItem.Content>
                                        <ListItem.Title>{user.nombre} {user.apellido} - {user.provincia}</ListItem.Title>
                                        <ListItem.Subtitle>{user.dni}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <TouchableOpacity
                                        onPress={() => eliminaruser(user.id)}
                                    >
                                        <Icon name="trash" size={24} color="#FF0000" style={style.basura} />
                                    </TouchableOpacity>
                                </ListItem>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}