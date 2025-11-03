
# Financial Planner (React + Capacitor Android App)

## 🧾 Overview
**Financial Planner** is a modern Progressive Web App (PWA) built using **React (TypeScript)** and **Vite**.  
It helps users plan, track, and analyze their personal finances with clean visuals and offline capability.  
This project can be deployed as a web app or converted into a fully installable **Android APK** using **Capacitor**.

---

## 🚀 Features
- Track income, expenses, and savings efficiently  
- Category-based budgeting and transaction tracking  
- Real-time charts and spending insights  
- Offline support via local storage  
- Works as both web PWA and Android native app  

---

## 🧰 Tech Stack
- **Frontend:** React + TypeScript + Vite  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Storage:** Local Storage / IndexedDB  
- **Build Tools:** Vite + npm  
- **Android Packaging:** Capacitor  

---

## ⚙️ Installation (Web App)
1. **Install dependencies:**
   ```bash
   nvm install 22
   nvm use 22
   npm install
   ```
2. **Start development server:**
   ```bash
   npm run dev
   ```
3. **Build production version:**
   ```bash
   npm run build
   ```
4. **Preview locally:**
   ```bash
   npm run preview
   ```

---

## 📱 Convert to Android (.apk) using Capacitor

### **1. Prerequisites**
Ensure the following are installed:
- Node.js (v16+)
- npm or yarn
- Java JDK 11 or 17
- Android Studio (with SDK and platform tools)

---

### **2. Run the provided script**
Use the **build_apk_with_capacitor.sh** script (included separately) to automate Android packaging.

```bash
bash build_apk_with_capacitor.sh
```

This script will:
- Install dependencies  
- Build the web app  
- Initialize Capacitor  
- Add Android platform  
- Copy web build into Android project  

After completion, an `android/` folder will be generated.

---

### **3. Open and Build in Android Studio**
1. Open Android Studio → *Open existing project* → choose `android/`  
2. Let Gradle sync; accept any SDK prompts  
3. Build the APK:
   - **Debug:** `Build > Build Bundle(s) / APK(s) > Build APK(s)`  
   - **Release:** `Build > Generate Signed Bundle / APK`  

Or via CLI:
```bash
cd android
./gradlew assembleDebug
# or
./gradlew assembleRelease
```

---

## 🌐 Alternative Online Method (PWABuilder)
If you prefer not to use Android Studio:
1. Host your app (GitHub Pages, Netlify, Vercel, etc.)  
2. Visit [https://www.pwabuilder.com](https://www.pwabuilder.com)  
3. Enter your app URL → Generate Android package online  

---

## 🧩 Troubleshooting
| Issue | Solution |
|--------|-----------|
| Missing SDK | Install via Android Studio → SDK Manager |
| App not loading | Ensure correct `webDir` in `capacitor.config.json` |
| Signing errors | Add signing config in `android/app/build.gradle` |
| Environment not loading | Prefix variables with `VITE_` in `.env` |

---

## 📄 License
This project is open for educational and personal use.  
You may modify or redistribute it under your own license terms.

---

## 👨‍💻 Maintainer
**Developer:** G. Sevugamoorthi  
**Email:** (add your contact email here)  
**Purpose:** Simplify financial management through smart, accessible tools.

---

## 📝 Short Description (for GitHub/Play Store)
Financial Planner helps you manage income, expenses, and savings with real-time insights and offline support. Built with React + Capacitor, it works as both a PWA and Android app.
