import React, { useState } from "react";
import { Text, View, ImageBackground, StyleSheet, Picker, Button, TouchableOpacity, TextInput, Alert } from "react-native";
import Swal from "sweetalert2";
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

    const [state, setState] = useState({
        longitud: "",
        peso: ""
    });

    const handleDimen = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const calcularEnvio = () => {
        const { longitud, peso } = state;
        const pesoNum = parseFloat(peso);
        const longitudNum = parseFloat(longitud);

        // Verificar que los valores son numéricos
        if (isNaN(pesoNum) || isNaN(longitudNum)) {
            Alert.alert("Error", "Por favor, ingrese valores válidos para peso y longitud.");
            return;
        }

        // Lógica de cálculo
        let precio;
        if (pesoNum < 10 && longitudNum > 0) {
            precio = 10000;
        } else if (pesoNum > 10 && longitudNum < 10){
            precio = 20000;
        } else if (pesoNum > 10 && longitudNum > 20){
            precio = 30000;
        }
        Swal.fire({
            title: `El precio del envío es: $${precio}`,
            icon: 'success',
            backdrop: false, 
            allowOutsideClick: false 
        })
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
                <TouchableOpacity style={styles.buttonSuc}>
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
                <Text style={{ fontSize: 17 }}>Longitud</Text>
                <View style={styles.cajaIng}>
                    <TextInput
                        placeholder='Longitud'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        keyboardType="numeric"
                        onChangeText={(value) => handleDimen('longitud', value)}
                    />
                </View>
                <Text style={{ fontSize: 17 }}>Peso</Text>
                <View style={styles.cajaIng}>
                    <TextInput
                        placeholder='Peso'
                        style={{ paddingHorizontal: 15, outline: 0 }}
                        keyboardType="numeric"
                        onChangeText={(value) => handleDimen('peso', value)}
                    />
                </View>
                <View style={{ marginTop: 25 }}>
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
    menu: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 20,
        position: 'absolute',
        top: 80,
    },
    menuItem: {
        fontSize: 16,
        color: 'black',
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
        height: 'auto',
        marginTop: '7em'
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
        backgroundColor: '#a4cdd1',
        borderRadius: 25,
        paddingHorizontal: 15,
        flexShrink: 1,
    },
    buttonSuc: {
        padding: 20,
        backgroundColor: '#a4cdd1',
        borderRadius: 25,
        paddingHorizontal: 15,
        flexShrink: 1,
        left: 50,
    },
    cajaIng: {
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        marginBottom: 10,
        marginTop: 2
    }
});
