import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth/react-native";


function errosFirebase(error) {
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'E-mail já cadastrado';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'E-mail inválido';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'Senha fraca. A senha deve ter pelo menos 6 caracteres';
    default:
      return 'Erro desconhecido';
  }
}

export async function cadastrarUsuario(email, senha) {
  const result = await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      return 'sucesso';
      // ...
    }).catch((error) => {
      console.log(error);
      return errosFirebase(error);
    });
  return result;
}

export async function logarUsuario(email, senha) {
  const result = await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      return 'sucesso';
      // ...
    }).catch((error) => {
      console.log(error);
      //return errosFirebase(error);
      return 'Erro ao logar';
    });
  return result;
}

export async function deslogarUsuario() {
  await signOut(auth)
    .then(() => {
      console.log('deslogou');
    }).catch((error) => {
      console.log(error);
    });
}