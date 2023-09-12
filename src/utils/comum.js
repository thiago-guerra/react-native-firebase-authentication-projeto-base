
export function alteraDados(campo, valor, dados, setDados) {
    setDados({ ...dados, [campo]: valor });
  }

  export function verificaEntravaVazia(dados, setDados, entradas, setMessageError){
    let erro = false;
    entradas.forEach(entrada => {
      if(dados[entrada.name] == ''){
        setDados({ ...dados, [entrada.name]: null });
        setMessageError(entrada.messageError);
        erro = true;
      }
    });
    return erro;
  }