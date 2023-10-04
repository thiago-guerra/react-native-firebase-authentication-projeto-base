import { Text, TouchableOpacity } from 'react-native';
import estilos from './estilos';

export default function Botao({ onPress, children, deletar = false }) {
  
  const estilo = estilos(deletar);

  return (
    <TouchableOpacity style={estilo.botao} onPress={onPress}>
      <Text style={estilo.textoBotao}>{children}</Text>
    </TouchableOpacity>
  );
}
