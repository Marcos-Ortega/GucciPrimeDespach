import React from "react";
import { Text, View, ImageBackground, StyleSheet} from "react-native";
export default function Home() {
    const style = StyleSheet.create({ 
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center'
        },
        text:{
            color:'white',
            fontSize:40,
        }
    })
    return (
        <ImageBackground
            source={require('../assets/fondoCajas.png')}
            resizeMode={'cover'}
            style={style.backgroundImage}
        >
            <View >
                <Text style={style.text}>HAGAN USTEDES EL HOME</Text>
            </View>
        </ImageBackground>
    )
}