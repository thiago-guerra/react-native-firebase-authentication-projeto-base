import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrarUsuario } from '../../servicos/requisivoesFirebase';
import Alerta from '../../componentes/alerta';
import { alteraDados, verificaEntravaVazia } from '../../utils/comum';
import { entradas } from './entradas';

export default function Cadastro({ navigation }) {
  const [dados, setDados] = useState({ email: '', senha: '', confirmaSenha: '' });
  const [statusError, setStatusError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('');

  function verificaSenhaIguais(){
    return dados.senha != dados.confirmaSenha;
  }

  async function cadastrar() {
    if (verificaEntravaVazia(dados, setDados, entradas, setMessageError)) return;
    if (dados.senha != dados.confirmaSenha) {
      setStatusError(true);
      setMessageError('as senhas não conferem');
      return;
    }

    const resultado = await cadastrarUsuario(dados.email, dados.senha, dados.confirmaSenha);
    if (resultado == 'sucesso') {
      setStatusError(true);
      setMessageError('Usuário cadastrado com sucesso');
      setDados({ email: '', senha: '', confirmaSenha: '' });
      setTipoAlerta('sucesso');
    }
    else {
      setStatusError(true);
      setMessageError(resultado);
      setTipoAlerta('erro');
    }

  }

  return (
    <View style={estilos.container}>
      {
        entradas.map((entrada) => {
          return (
            <EntradaTexto
              key={entrada.id}
              {...entrada}
              value={dados[entrada.name]}
              onChangeText={texto => alteraDados(entrada.name, texto, dados, setDados)}
              error={entrada.name != 'confirmaSenha' ? false : verificaSenhaIguais() && dados.confirmaSenha != ''}
            />
          )
        })
      }
      <Alerta
        mensagem={messageError}
        error={statusError}
        setError={setStatusError}
        tipoAlerta={tipoAlerta}
      />
      <Botao onPress={cadastrar}>CADASTRAR</Botao>
    </View>
  );
}
