import { db } from "../config/firebase";
import { collection, addDoc, getDoc, getDocs } from 'firebase/firestore';

export async function salvarProduto(data) {
    try {
        data.id = Math.random().toString(36).substring(7);
        await addDoc(collection(db, "produtos"), data);
        return 'ok';
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}

export async function listarProdutos() {
    try {
        const prodsRef = collection(db, 'produtos');
        let docSnapshot = await getDocs(prodsRef);
        let produtos = [];
        docSnapshot.forEach((data) =>{
            produtos.push(data.data());
        });
        return produtos;
    } catch (error) {
        console.log("erro ,", error);
        return 'erro';
    }
}