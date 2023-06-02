import { Route, Routes } from "react-router-dom";
import VideoPool from "./videoLibrary";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Menu from "./Menu";
import MediaControlCard from "./VideoCards";
import Video from "./video";
import Playerr from "./player";

export const Router = () =>
    <Routes>
        <Route path="/" element={<SignIn/>}></Route>
        <Route path="signIn" element={<SignIn/>}></Route>
        <Route path="signUp" element={<SignUp/>}></Route>
        <Route path="videoLibrary" element={<VideoPool/>}></Route>
        <Route path="menu" element={<Menu/>}></Route>
        <Route path="videocard" element={<MediaControlCard/>}></Route>
        <Route path="video" element={<Video/>}></Route>
        <Route path="player" element={<Playerr/>}></Route>
    </Routes>