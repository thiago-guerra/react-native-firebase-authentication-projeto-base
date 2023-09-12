import React from 'react';
import { View, Text } from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import estilos from './estilos';
import { auth } from '../../config/firebase';
import { deslogarUsuario } from '../../servicos/requisivoesFirebase';

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;

  async function deslogar() {
    await deslogarUsuario();
    navigation.replace('Login')
  }


  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>

      <Produto nome="Tênis" preco="200,00" />
      <Produto nome="Camisa" preco="100,00" />
      <Produto nome="Suplementos" preco="150,00" />
     </View>
  );
}
