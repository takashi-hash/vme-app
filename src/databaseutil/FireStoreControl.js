import {
  doc,
  writeBatch,
  setDoc,
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../service/firebase";

// fireStore のCSVマスタデータを追加する
export function FireStoreAddCsv(collectionName, addDatas) {
  //いっぺんに登録する為、データ件数を回す
  const AddDocument = () => {
    Object.keys(addDatas).forEach((csvKeyName) => {
      //オブジェクト型{キー名:値}で１レコードずつ登録
      setDoc(
        doc(db, collectionName, String(addDatas[csvKeyName].患者ID)),
        addDatas[csvKeyName]
      );
    });
  };
  //ドキュメントを追加する。
  const AsyncGet = async () => {
    AddDocument();
    const asyncDatas = await getDocs(collection(db, collectionName)).then(
      (response) => {
        return response.docs.map((doc) => ({ ...doc.data() }));
      }
    );
    return asyncDatas;
  };
  const datas = AsyncGet();
  //登録されたデータを返却する
  return datas;
}

// fireStore にCSVデータを追加する
export function FireStoreAdd(collectionName) {
  const AsyncGet = async () => {
    const asyncDatas = await getDocs(collection(db, collectionName)).then(
      (response) => {
        return response.docs.map((doc) => ({ ...doc.data() }));
      }
    );
    return asyncDatas;
  };
  const datas = AsyncGet();
  //登録されたデータを返却する
  return datas;
}
