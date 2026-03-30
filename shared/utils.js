import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class Logger {
  constructor(module) {
    this.module = module;
  }

  log(action, details = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      module: this.module,
      action,
      ...details
    };
    console.log(`[${logEntry.timestamp}] [${this.module}] ${action}`, details);
  }

  error(action, error) {
    console.error(`[ERROR] [${this.module}] ${action}`, error);
  }

  info(message) {
    console.info(`[INFO] [${this.module}] ${message}`);
  }
}

export { auth, db, Logger };
