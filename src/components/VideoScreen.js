// import React from "react";
// import Webcam from "react-webcam";
// import "./aaSapir.css";

// function AASapir() {
//     const videoConstraints = {
//         width: { min: 480 },
//         height: { min: 720 },
//         aspectRatio: 0.6666666667,
//         facingMode: "user"
//     };
//     return (
//         <div className="Aa-sapir">
//             <Webcam imageSmoothing={true} screenshotFormat='image/webp' videoConstraints={videoConstraints} />
//         </div>
//     );
// }

// export default AASapir;
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import MediaControlCard from "./VideoCards";
import srcV from '../Images/video.mp4';
import './VideoScreen.css';
import { BsFillCameraVideoFill, BsStopCircle, BsFillCameraVideoOffFill } from 'react-icons/bs';
import { VscUnmute, VscMute } from 'react-icons/vsc';
import { MdOutlineNotStarted } from 'react-icons/md';
import { BiPauseCircle } from 'react-icons/bi';
import { FiCameraOff } from 'react-icons/fi';
import { useEffect } from "react";
import { getAllVideos, postPicture } from "../Services/user";

function VideoScreen() {
    const [img, setImg] = useState(null);
    const webcamRef = useRef(null);
    const [videoChecked, setVideoChecked] = useState('');
    const [mute, setMute] = useState(false);
    const [start, setStart] = useState(false);
    const [startPhoto, setStartPhoto] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [numToStart, setNumToStart] = useState(3);
    const [showNumToStart, setShowNumToStart] = useState(false);
    // const [showNumToStart1, setShowNumToStart1] = useState(false);

    const [videosArr, setVideosArr] = useState(
        [{ name: 'video number 1', id: '1' }, { name: 'video number 1', id: '1' }, { name: 'video number 1', id: '1' }]);
    let myInterval;

    const videoConstraints = {
        width: 400,
        height: 260,
        facingMode: "user",
    };

    useEffect(() => {
        //הקריאה של הוידאו להוריד את הירוק
        // const res = getAllVideos();
        // if (res.status === 200) {
        //     setVideosArr(res.data)
        // }
    }, []);

    function capture() {
        setShowNumToStart(true)
        const myStartNumbers = setInterval(() => {
            setNumToStart(numToStart - 1)
        }, 1000);

        setTimeout(() => {
            setStartPhoto(true)
            myInterval = setInterval(async function () {
                var imageSrc = webcamRef?.current?.getScreenshot();
                setImg(imageSrc);
                await postPicture(imageSrc, showCamera);
            }, 5000)
            setShowNumToStart(false)
            clearInterval(myStartNumbers);
        }, 3000);
    };

    const stopCameraPhotos = () => {
        clearInterval(myInterval)
        setShowCamera(false)
    }

    var myVideo = document.getElementById("video1");

    function playPause() {
        myVideo = document.getElementById("video1");
        if (myVideo.paused)
            myVideo.play();
        else
            myVideo.pause();
        setStart(!start)
    }

    function muteUnMute() {
        if (!myVideo.muted)
            myVideo.muted = 'muted';
        else
            myVideo.muted = false;
        setMute(!mute)
    }

    return (
        <div className="Container">
            <>
                <MediaControlCard
                    videoChecked={videoChecked}
                    setVideoChecked={setVideoChecked}
                    videosArr={videosArr}
                />
                <div className="videos-boards">
                    <div>
                        <video onEnded={() => stopCameraPhotos()} style={{ borderRadius: '20px' }} id="video1" className="video-kosher" width="404" height="300" controls>
                            <source src={srcV} type="video/mp4" />
                        </video>

                    </div>
                    {showNumToStart && <div>{numToStart}</div>}
                    {showCamera ? <div>
                        <Webcam
                            style={startPhoto && { border: '2px solid red' }}
                            audio={false}
                            mirrored={true}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </div>
                        : <div className="no-image"><FiCameraOff /></div>}
                </div>
                <div className="all-video-icons">

                    {start ? <BiPauseCircle className="video-icon" onClick={playPause} />
                        : <MdOutlineNotStarted onClick={playPause} className="video-icon" />}
                    {mute ? <VscUnmute onClick={muteUnMute} className="video-icon" />
                        : <VscMute className="video-icon" onClick={muteUnMute} />}
                    {showCamera ? <BsFillCameraVideoOffFill onClick={() => setShowCamera(!showCamera)} className="video-icon" />
                        : <BsFillCameraVideoFill className="video-icon" onClick={() => setShowCamera(!showCamera)} />}

                    <BsStopCircle className="video-icon" onClick={() => capture()} />
                    {/* <BsRecordCircleFill className="video-icon" /> */}
                </div>
                <img src={img} alt="screenshot" />
                <button onClick={() => stopCameraPhotos()}>Stop</button>
            </>
        </div>
    );
}

export default VideoScreen;