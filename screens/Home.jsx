import React, { useState } from "react";
import { Text, View, ImageBackground, StyleSheet, Picker, Button, TouchableOpacity } from "react-native";


export default function Home() {
    const [ubicacion, setUbicacion] = useState("Seleccione");
    const [destino, setDestino] = useState("Seleccione");

    const provincias = [
        "Seleccione", "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut",
        "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta",
        "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero",
        "Tierra del Fuego", "Tucumán"
    ];

    const calcularEnvio = () => {
        // Lógica para calcular el envío
        console.log(`Ubicación: ${ubicacion}, Destino: ${destino}`);
    };

    return (
        <ImageBackground
            source={require('../assets/fondoCajas.png')}
            resizeMode={'cover'}
            style={styles.backgroundImage}
        >

            <View style={styles.menu}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.menuItem}>Envios</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.menuItem}>Sucursales</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.menuItem}>Preguntas frecuentes</Text>
                </TouchableOpacity >
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Calcular mi Envio</Text>
                <Text style={{ fontSize: 17 }}>Mi Ubicacion</Text>
                <Picker selectedValue={ubicacion} onValueChange={(itemValue) => setUbicacion(itemValue)}>
                    {provincias.map((provincia, index) => (
                        <Picker.Item key={index} label={provincia} value={provincia} />
                    ))}
                </Picker>
                <Text style={{ fontSize: 17 }}>Destino</Text>
                <Picker selectedValue={destino} onValueChange={(itemValue) => setDestino(itemValue)}>
                    {provincias.map((provincia, index) => (
                        <Picker.Item key={index} label={provincia} value={provincia} />
                    ))}
                </Picker>
                <View style={{ marginTop: 25}}>
                    <Button title="Calcular Envio" onPress={calcularEnvio} />
                </View>
            </View>
            <TouchableOpacity style={styles.realizarEnvioButton}>
                <Text style={styles.buttonText}>Realizar un envio</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    menu: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 20,
        position: 'absolute',
        top: 80,
    },
    menuItem: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '3em',
        borderRadius: 8,
        marginBottom: 16,
        width: 'auto',
        height: '19em',
        boxShadow: '10px 10px 5px rgba(0, 0, 0, 0.5)', 
    },
    formTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center'
    },
    realizarEnvioButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    button: {
        padding: 20,
        backgroundColor: '#d17e0c',
        borderRadius: 25,
        paddingHorizontal: 15,
        flexShrink: 1,
    }
});
