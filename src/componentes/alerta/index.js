import React from "react";
import { Snackbar } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function Alerta({ mensagem, error = false, setError, tipoAlerta }) {
   const estilo =  styles(tipoAlerta);
   
    return (
        <Snackbar
            visible={error}
            onDismiss={() => setError(false)}
            duration={1500}
            style={estilo.alerta}
            action={
                {
                    label: 'Ok',
                    onPress: () => setError(false)
                }
            }
        >
            {mensagem}
        </Snackbar>
    );
}

const styles = (tipo) => {
    return StyleSheet.create({
       alerta:{
        backgroundColor: tipo == 'erro' ? '#ff0000' : '#00ff00',
       }     
    });
} 