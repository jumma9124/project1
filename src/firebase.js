import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// 파이어베이스 콘솔의 '프로젝트 설정'에서 복사한 내 SDK 설정값을 여기에 붙여넣으세요
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "project1-13bc0.firebasestorage.app", // 아까 확인한 버킷 주소
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
