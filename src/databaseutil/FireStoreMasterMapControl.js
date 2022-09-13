import {
  writeBatch,
  doc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../service/firebase";

// fireStore のCSVマスタデータを追加する
export function UpdateMasterCSVData(collectionName, addDatas) {
  Object.keys(addDatas).forEach((csvKeyName) => {
    //オブジェクト型{キー名:値}で１レコードずつ登録
    setDoc(
      doc(db, collectionName, String(addDatas[csvKeyName].患者ID)),
      addDatas[csvKeyName]
    );
  });
}
// fireStore のマップデータを追加する
export function UpdateMasterMapIconData(collectionName, addDatas) {
  //バッチ処理の準備
  const batch = writeBatch(db);
  //CSVデータの登録
  const masterMapDocRef = doc(db, collectionName, "Mapdata");

  Object.keys(addDatas).forEach((csvKeyName) => {
    //オブジェクト型{キー名:値}で１レコードずつ登録
    batch.set(
      doc(
        db,
        collectionName,
        masterMapDocRef.id,
        "IconDatas",
        addDatas[csvKeyName].ID
      ),
      addDatas[csvKeyName]
    );
  });
  batch.commit();
}
// fireStore のマップデータを追加する
export function UpdateMasterHistory(registerUser) {
  const batch = writeBatch(db);
  if (registerUser !== undefined) {
    batch.set(doc(collection(db, "MasterUpdateHistory"), "data"), {
      mapName: "マスタデータ",
      timestamp: serverTimestamp(),
      registerUser: registerUser,
    });
  } else {
    batch.set(doc(collection(db, "MasterUpdateHistory"), "data"), {
      mapName: "マスタデータ",
      timestamp: serverTimestamp(),
      registerUser: "ゲストユーザ",
    });
  }
  batch.commit();
}

// 編集したマップデータを追加する
export function RegisterMapIconData(
  collectionName,
  addDatas,
  mapName,
  currentUser
) {
  //バッチ処理の準備
  const batch = writeBatch(db);
  //CSVデータの登録
  const masterMapDocRef = doc(collection(db, collectionName));

  if (currentUser !== undefined) {
    batch.set(masterMapDocRef, {
      mapName: mapName,
      timestamp: serverTimestamp(),
      registerUser: currentUser,
    });
  } else {
    batch.set(masterMapDocRef, {
      mapName: mapName,
      timestamp: serverTimestamp(),
      registerUser: "ゲストユーザ",
    });
  }

  Object.keys(addDatas).forEach((csvKeyName) => {
    //オブジェクト型{キー名:値}で１レコードずつ登録
    batch.set(
      doc(
        db,
        collectionName,
        masterMapDocRef.id,
        "IconDatas",
        addDatas[csvKeyName].ID
      ),
      addDatas[csvKeyName]
    );
  });
  batch.commit();
}

// 編集したマップデータを更新する
export function UpdateRegisterMapIconData(collectionName, id, addDatas) {
  //バッチ処理の準備
  const batch = writeBatch(db);
  //CSVデータの登録
  const masterMapDocRef = doc(db, collectionName, id);
  batch.update(masterMapDocRef, {
    timestamp: serverTimestamp(),
  });
  Object.keys(addDatas).forEach((csvKeyName) => {
    //オブジェクト型{キー名:値}で１レコードずつ登録
    batch.update(
      doc(
        db,
        collectionName,
        masterMapDocRef.id,
        "IconDatas",
        addDatas[csvKeyName].ID
      ),
      addDatas[csvKeyName]
    );
  });
  batch.commit();
}

//CSVデータを取得する。
export function GetMasterMapData(collectionName) {
  return new Promise((resolve, reject) => {
    const asyncDatas = getDocs(collection(db, collectionName)).then(
      (response) => {
        return response.docs.map((doc) => ({ ...doc.data() }));
      }
    );
    resolve(asyncDatas);
  });
}

//条件で絞込した患者IDを取得する。
export function GetMasterMapData2(condition1, condition2, condition3) {
  //取得処理
  const getMap = async () => {
    const ref = collection(db, "/MapListdata");
    let q = ref;

    // 条件による絞込
    if (condition1 !== "条件なし") {
      q = query(q, where("主治医", "==", condition1));
    }
    if (condition2 !== "条件なし") {
      q = query(q, where("weekday", "==", condition2));
    }
    if (condition3 !== "条件なし") {
      q = query(q, where("week", "array-contains", Number(condition3)));
    }

    // 取得
    const querySnapshot = await getDocs(q);
    // 返却データ格納
    const resultPatientId = [];
    querySnapshot.forEach((doc) => {
      // 患者IDを返却
      if (doc.data().患者ID !== undefined) {
        resultPatientId.push(doc.data().患者ID);
      }
    });
    return resultPatientId;
  };

  let result = getMap();

  return result;
}

// コレクション全体の削除
export function deleteCollection(collectionName, batchSize) {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, limit(batchSize));
  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, q, batchSize, resolve, reject);
  });
}
//削除のメインコード
const deleteQueryBatch = (db, query, batchSize, resolve, reject) => {
  getDocs(query)
    .then((snapshot) => {
      //検索結果が0件なら処理終わり
      if (snapshot.size === 0) {
        return 0;
      }

      //削除のメイン処理
      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      //一旦処理サイズをreturn
      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then((numDeleted) => {
      //もう対象のデータが0なら処理終わり
      if (numDeleted === 0) {
        resolve();
        return;
      } else {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      }
    })
    .catch(reject);
};
