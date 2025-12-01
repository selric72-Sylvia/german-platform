// Firebase 初始模块
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// 你的配置
const firebaseConfig = {
  apiKey: "AIzaSyCZNCeZOjk0wfGgm5SFsIM-zuiIkFp-QUA",
  authDomain: "sylvia-deutsch-platform.firebaseapp.com",
  projectId: "sylvia-deutsch-platform",
  storageBucket: "sylvia-deutsch-platform.firebasestorage.app",
  messagingSenderId: "923812260574",
  appId: "1:923812260574:web:15c8904b6c7bd3492d704f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 自动匿名登录
export async function autoLogin() {
  try {
    await signInAnonymously(auth);
  } catch (e) {
    console.error("匿名登录失败", e);
  }
}

// 用户状态监听
export function onUser(callback) {
  onAuthStateChanged(auth, callback);
}

// 云端读取
export async function load(collection, uid) {
  const ref = doc(db, collection, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : {};
}

// 云端保存（合并）
export async function save(collection, uid, data) {
  const ref = doc(db, collection, uid);
  await setDoc(ref, data, { merge: true });
}
