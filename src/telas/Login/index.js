import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { logarUsuario } from '../../servicos/requisivoesFirebase';
import Alerta from '../../componentes/alerta';
import { auth } from '../../config/firebase';
import animacao from '../../../assets/animacao-carregando.gif';
import { alteraDados, verificaEntravaVazia } from '../../utils/comum';
import { entradas } from './entradas';

export default function Login({ navigation }) {
  const [dados, setDados] = useState({ email: '', senha: '' });
  const [statusError, setStatusError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(usuario => {
      if (usuario) {
        navigation.replace('Principal')
      }
      setCarregando(false);
    });
    return () => estadoUsuario();
  }, []);



  async function realizarLogin() {
    if (verificaEntravaVazia(dados, setDados, entradas, setMessageError)) return;

    const resultado = await logarUsuario(dados.email, dados.senha);
    
    if(resultado == 'sucesso'){
      setDados({ email: '', senha: '' });
      navigation.replace('Principal');
    } else {
      setStatusError(true);
      setMessageError(resultado);
      setTipoAlerta('erro');
    }
  }

  if (carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={animacao} style={estilos.imagemCarregando} />
      </View>
    );
  } else
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
              />
            )
          })
        }

        <Botao onPress={realizarLogin}>LOGAR</Botao>
        <Botao
          onPress={() => { navigation.navigate('Cadastro') }}
        >
          CADASTRAR USUÁRIO
        </Botao>
        <Alerta
          mensagem={messageError}
          error={statusError}
          setError={setStatusError}
          tipoAlerta={tipoAlerta}
        />
      </View>
    );
}
