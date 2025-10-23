# React Native Mobile Prototype

A **React Native** + **Expo** mobile prototype built for a technical interview.  
The app simulates a simple **login and user profile management system**.

---

## 🚀 Main Features

### 1. **Login Screen (`LoginScreen`)**
- Validates user input (email and password).  
- Compares credentials against a local JSON file (`users.json`).  
- Redirects to the profile page upon successful authentication.  
- Displays clear error messages for invalid inputs.

### 2. **Profile Screen (`ProfileScreen`)**
- Displays the logged-in user’s information.  
- Allows editing of profile fields: first name, last name, email, and birth date.  
- Performs field validation before updating.  
- Simulates data updates (no real backend).  
- Displays confirmation or error messages accordingly.

---

## 🧠 Prototype Logic

- Global state `user` is managed in **`App.js`** using the `useState` hook.  
- This state is passed through **props** to all screens.  
- `LoginScreen` updates the user data with `setUser()`.  
- `ProfileScreen` reads and edits that same data locally.  
- In production, updates would be handled via a REST API (`fetch()` / `axios`).

---

## 🧩 Project Structure

```text
malopan-proto/
├── App.js
├── data/
│   └── users.json
├── screens/
│   ├── LoginScreen.js
│   ├── ProfileScreen.js
│   └── TransactionsScreen.js
├── package.json
└── README.md
```

---

## ⚙️ Technologies Used

- **React Native**
- **Expo**
- **React Navigation (Native Stack)**
- **JavaScript (ES6+)**
- **Hooks (`useState`)**
- **StyleSheet API**

---

## 📱 Run the Project


---

## Installation
To run the prototype locally:

```
bash
npm install
npx expo start
Then:
Press w to open the web preview, or
Scan the QR code with Expo Go (Android/iOS) to launch it on a device.
```

## Notes for Evaluation

The authentication and update logic use local JSON simulation.
In production, these operations would use an API call:
```
fetch('http://localhost:3000/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedUser)
});
```
The prototype focuses on code readability, structure, and navigation logic, not backend implementation.

---

## Author
Nicolas Lavarde
📧 nicolas.lavarde@gmail.com
🔗 github.com/ThreeFrogs511

## License
MIT License — Free to use for educational or recruitment purposes.
