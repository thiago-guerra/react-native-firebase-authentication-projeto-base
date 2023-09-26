import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, } from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import estilos from './estilos';
import { auth } from '../../config/firebase';
import { deslogarUsuario } from '../../servicos/auth';
import { BotaoProduto } from '../../componentes/botaoProduto';
import { listarProdutos } from '../../servicos/firestore';

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      let prods = await listarProdutos();
      setProdutos(prods);
    }
    carregarProdutos();
  }, [produtos]);

  async function deslogar() {
    await deslogarUsuario();
    navigation.navigate('Login')
  }


  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Produto nome={item.nome} preco={item.preco} />
        )}

      >

      </FlatList>

      <BotaoProduto onPress={() => navigation.navigate('DadosProduto')}></BotaoProduto>
    </View>
  );
}
