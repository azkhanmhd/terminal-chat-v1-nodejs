# 💬 Simple Terminal Based Chat App - V1

> **This Project Is Still Under Development.**  

## 📦 Features

- Terminal-Based Real-Time Messaging.
- Client-2-Client Encryption Using a Shared Key.
- Shared Key is Also Used To Connect Clients To a Chat Room.
- Client Has to Enter Only a Name & a Shared Key. (Clients Decides The Key)
- Separate Client and Server Modules For More Protection And Development.
- Chalk-Colored Output For Better Readability.

---

## 🖥️ Server Setup

1. Clone or download the server files:  
   `server-terminal-chat-v1-nodejs 📁`

2. Then:
   ```bash
    cd server-terminal-chat-v1-nodejs
    npm install
    node server.js
   ```
3. If any error occur during running or for best compatibility; Use Chalk v4 ;
   ```bash
     npm install chalk@4
   ```

---

## 💻 Client Setup

1. Clone or download the Client files:  
   `client-terminal-chat-v1-nodejs 📁`

2. Then:
   ```bash
    cd client-terminal-chat-v1-nodejs
    npm install
    node client.js
   ```
3. If any error occur during running or for best compatibility; Use Chalk v4 ;
   ```bash
     npm install chalk@4
   ```

---

## 📌 Notes

- Make sure both client and server are using the same port and host. (Default:- localhost:3000)
- If you encounter errors related to the chalk package, downgrade to version 4 as shown above.
- Both clients must use the same shared key to communicate in the same room.

---

## ⏳ Planing To Work On...

 - Better Error Handling 😎
 - Stronger Encryption ☠️ (Currently Basic 😁)
 - Resgister/Login (Passwords Will Be Saved As Hased & Encrypted) #🛡️⛓🔑
 - Locally Save Chats Encrypted. 🔒
 - Command Support `</>` (/exit, /users, /login, etc) 
 - And Some More... 😅

---

> Made With ❤️&☕ By Azk 💗
