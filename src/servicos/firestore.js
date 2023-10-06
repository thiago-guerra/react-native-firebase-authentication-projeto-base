import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
query, onSnapshot } from 'firebase/firestore';

export async function salvarProduto(data) {
    try {
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
            let produto = {id: data.id, ...data.data()};
            produtos.push(produto);
        });
        return produtos;
    } catch (error) {
        console.log("erro ,", error);
        return 'erro';
    }
}

export async function editarProduto(data) {
    try {
        const docRef = doc(db, "produtos", data.id);

        await updateDoc(docRef, {
            nome: data.nome,
            preco: data.preco
        });
        return 'ok';
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}

export async function deletarProduto(id) {
    try {
        const docRef = doc(db, "produtos", id);
        await deleteDoc(docRef);
        return 'ok';
    } catch (error) {
        console.log(error);
        return 'erro';
    }
}

export async function listarProdutosTempoReal(setProdutos) {
const ref = query(collection(db, "produtos"));
 onSnapshot(ref, (querySnapshot) => {
    let produtos = [];
    querySnapshot.forEach((doc) => {
        let produto = {id: doc.id, ...doc.data()};
        produtos.push(produto);
    });
    setProdutos(produtos);
});
}