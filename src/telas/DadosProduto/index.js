import { Alert, View } from "react-native";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import Botao from '../../componentes/Botao';
import estilos from './estilos';
import React, { useEffect, useState } from "react";
import { editarProduto, salvarProduto, deletarProduto } from "../../servicos/firestore";

export default function DadosProduto({ navigation, route }) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (route.params?.produto) {
            const { produto } = route.params;
            setNome(produto.nome);
            setPreco(produto.preco);
            setEdit(true);
        }
    }, []);


    async function salvar() {
        let resultado = '';
        if (edit) {
            const { produto } = route.params;
            resultado = await editarProduto({
                id: produto.id,
                nome,
                preco
            })
        } else {
            resultado = await salvarProduto({
                nome,
                preco
            });
        }
        if (resultado == 'erro') {
            Alert.alert('Erro', 'Erro ao salvar o produto');
        } else {
            navigation.goBack();
        }
    }

    async function deletar() {
        Alert.alert('Deletar', 'Deseja realmente deletar o produto?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: async () => {
                    const result = await deletarProduto(route.params.produto.id);
                    if (result == 'erro') {
                        Alert.alert('Erro', 'Erro ao deletar o produto');
                    } else {
                        navigation.goBack();
                    }
                }
            }
        ]);
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
            {
                edit &&
                <Botao onPress={deletar} deletar>Deletar</Botao>
            }

        </View>
    );
}