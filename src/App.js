import './App.css';
import VideoScreen from "./components/VideoScreen";
import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import {Menu} from "./components/Menu";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import logoEasyDenc from './Images/easyDance.png';
import UserHistory from './components/UserHistory';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <div style={{width:'100%'}}><img alt="" className="logo-easy-denc" src={logoEasyDenc} /></div>
        
        <Routes>
          <Route path='/' element={localStorage.userName === "" ? <SignIn /> : <VideoScreen />}/>
       
          <Route path="/signup" element={<SignUp />} />
          <Route path="/videoscreen" element={<VideoScreen />} />
          <Route path="/history" element={<UserHistory />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// import React from "react";
// import './App.css';
// import AASapir from "./components/aaSapir-Player";
// import SignIn from './components/SignIn';
// import Menu from "./components/Menu";
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import logoEasyDenc from './Images/easyDance.png';
// import SignUp from "./components/SignUp";

// export default function App() {

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Menu />
//         <img alt="" className="" src={logoEasyDenc} />
//         <Routes>
//           <Route path='/' element={localStorage.userName === "" ? <SignIn /> : <AASapir />}>
//           </Route>
//           <Route path="/signup" element={<SignUp />} ></Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

