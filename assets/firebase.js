// --- Firebase 初始化 ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// ---- 你的配置（已插入） ----
const firebaseConfig = {
  apiKey: "AIzaSyCZNCeZOjk0wfGgm5SFsIM-zuiIkFp-QUA",
  authDomain: "sylvia-deutsch-platform.firebaseapp.com",
  projectId: "sylvia-deutsch-platform",
  storageBucket: "sylvia-deutsch-platform.firebasestorage.app",
  messagingSenderId: "923812260574",
  appId: "1:923812260574:web:15c8904b6c7bd3492d704f"
};

// ---- 初始化 ----
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ---- 登录（邮箱密码） ----
export async function emailLogin(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// ---- Google 登录 ----
export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

// ---- 登出 ----
export async function logout() {
  return await signOut(auth);
}

// ---- 监听用户变化 ----
export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, callback);
}

// ---- 保存用户数据（词汇、计划、进度） ----
export async function saveUserData(uid, collection, data) {
  await setDoc(doc(db, collection, uid), data, { merge: true });
}

// ---- 读取用户数据 ----
export async function loadUserData(uid, collection) {
  const snapshot = await getDoc(doc(db, collection, uid));
  if (snapshot.exists()) return snapshot.data();
  return {};
}
