import express from "express";
import path from 'path';
import { fileURLToPath } from "url";


import http from "http";
import { Server } from "socket.io";


import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";


// const firebaseConfig = {
//     apiKey: "AIzaSyBMaSahaGoPlBfle1j9NcmduytyuVMQk4E",
//     authDomain: "safeside-pre.firebaseapp.com",
//     databaseURL: "https://safeside-pre-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "safeside-pre",
//     storageBucket: "safeside-pre.firebasestorage.app",
//     messagingSenderId: "674744021415",
//     appId: "1:674744021415:web:5e77ba1887c4a826be0682"
// };
// // Initialize Firebase

// const apps = initializeApp(firebaseConfig);
// const db = getDatabase();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// socket.io
const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());

// app.use(express.static('pages'));  
// // app.use(express.static('.')); 
// app.use(express.static(path.join(__dirname)));
// said by chatGPT  // to deploy
app.use(express.static(path.join(__dirname, 'pages')));


app.get('/', (req, res) => {
    // if(login)
    // {
    // res.sendFile(path.join(__dirname, 'pages', 'home.html'))
    // window.location.href = "https://www.google.com";
    // }
    // else{
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
    // } 
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'register.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
});
app.get('/register.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.js'));
});

/////////////
app.use('/services', express.static(path.join(__dirname, 'services')));

app.get('/login.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.js'));
});
// app.get('/mapLocation.js', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'services', 'mapLocation.js'));
// });

////////////

app.get('/mapLocation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'mapLocation.html'));
});
app.get('/volReg.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'volReg.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});


let passedLat = 2, passedLong = 2;


io.on('connection', (socket) => {

    socket.on('latLongToServer', (data) => {
        const { Lat, Long } = data;
        passedLat = Lat;
        passedLong = Long;
        console.log(`Latitude = ${passedLat}, Longitude = ${passedLong}`);

    });

}) 



//sending data(lat and long) to the mapLocation.js
app.get('/latLongForMap', (req, res) => {
    res.json({
        lat: passedLat,
        long: passedLong
    });
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});