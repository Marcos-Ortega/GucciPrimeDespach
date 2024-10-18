import React from 'react';
import 'react-native-gesture-handler';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import appFirebase from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Admin from '../admin-screen/Admin';
import ListaUsuarios from '../admin-screen/ListaUsuarios';
import ModificarUser from '../admin-screen/ModificarUser';
const Stack = createStackNavigator();
const auth = getAuth(appFirebase);

export default function MyStack() {
  const navigation = useNavigation();

  const CerrarSesion = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  const Logo = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/icono.png')}
        style={{ width: 50, height: 50, marginRight: 10, borderRadius: 25 }}
      />
      <Text style={{ color: 'white', fontSize: 18 }}>Gucci Prime Despach</Text>
    </View>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}
    >

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: () => <Logo />,
          title: 'Gucci Prime Despach',
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: () => <Logo />,
          title: 'Gucci Prime Despach',
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <Logo />,
          title: 'Gucci Prime Despach',
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={CerrarSesion}
                style={{ backgroundColor: 'transparent', marginLeft: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 15 }}>Salir</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          headerTitle: () => <Logo />,
          title: 'Gucci Prime Despach - Admin',
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={CerrarSesion}
                style={{ backgroundColor: 'transparent', marginLeft: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 15 }}>Salir</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      <Stack.Screen
        name="ListaUsuarios"
        component={ListaUsuarios}
        options={{
          headerTitle: () => <Logo />,
          title: 'Gucci Prime Despach - Admin',
        }}
      />
      <Stack.Screen
        name="ModificarUser"
        component={ModificarUser}
        options={{
          headerTitle: () => <Logo />,
          title: 'Gucci Prime Despach - Admin',
        }}
      />
    </Stack.Navigator>
  );
}
