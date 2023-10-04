import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, ScrollView } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

  async function carregarProdutos() {
    setRefreshing(true);
    let prods = await listarProdutos();
    setProdutos(prods);
    setRefreshing(false);
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function deslogar() {
    await deslogarUsuario();
    navigation.navigate('Login')
  }


  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <ScrollView style={{ width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarProdutos}
          />
        }>

      {
        produtos?.map((produto) => {
          return <Produto
            nome={produto.nome}
            preco={produto.preco}
            key={produto.id}
            onTouchEndCapture={() => navigation.navigate('DadosProduto', { produto })}
          />
        })
      }
      </ScrollView>

      <BotaoProduto onPress={() => navigation.navigate('DadosProduto')}></BotaoProduto>
    </View >
  );
}
