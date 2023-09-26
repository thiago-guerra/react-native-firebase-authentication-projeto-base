import { Alert, View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from '../../componentes/Botao';
import estilos from './estilos';
import React, { useState } from "react";
import { salvarProduto } from "../../servicos/firestore";

export default function DadosProduto({ navigation }) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');

    async function salvar() {
        console.log('salva');
        const resultado = await salvarProduto({
            nome,
            preco
        });
        console.log(resultado)
        if (resultado == 'erro') {
            Alert.alert('Erro', 'Erro ao salvar o produto');
        } else {
            navigation.goBack();
        }
    }

    return (
        <View style={estilos.container}>
            <EntradaTexto
                label="Nome do Produto"
                value={nome}
                onChangeText={(text) => setNome(text)}
            />
            <EntradaTexto
                label="Preço do Produto"
                value={preco}
                onChangeText={(text) => setPreco(text)}
            />
            <Botao onPress={() => { salvar(); }}>Salvar</Botao>
        </View>
    );
}