import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';

function VideoPlayer() {
  const [videos, setVideos] = useState(['video.mp4', 'video2.mp4', 'video3.mp4']);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoBasePath, setVideoBasePath] = useState('http://localhost:3000/');
  const [recordedChunks, setRecordedChunks] = useState([]);

  const mimeType = 'video/webm;codecs=h264';

  const handleVideoClick = (videoName) => {
    setSelectedVideo(videoName);
    videoRef.current.src = videoBasePath + videoName;
    videoRef.current.load();
  };

  const handlePlayClick = () => {
    videoRef.current.play();
    cameraRef.current.play();
  };

  const handleCameraClick = async () => {
    debugger
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraRef.current.srcObject = stream;
    cameraRef.current.play();
  // if (MediaRecorder.isTypeSupported(mimeType)) {
  //   const options = { mimeType };
  //   const mediaRecorder = new MediaRecorder(stream, options);
  //   mediaRecorderRef.current = mediaRecorder;
  // } else {
  //   const options = { mimeType: 'video/webm' };
  //   const mediaRecorder = new MediaRecorder(stream, options);
  //   mediaRecorderRef.current = mediaRecorder;
  // }
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=h264' });
  };

  const handleRecordClick = () => {
    console.log('handleRecordClick');
    console.log('mediaRecorderRef.current');
    console.log(mediaRecorderRef.current);
    console.log('selectedVideo');
    console.log(selectedVideo);
    if (!mediaRecorderRef.current || !selectedVideo) {
      console.log('go to  return!!');
      return;
    }

    videoRef.current.currentTime = 0;
    videoRef.current.play();

    // Reset the recorded chunks
    setRecordedChunks([]);

    mediaRecorderRef.current.start();

    // Start recording the camera feed
    const cameraStream = cameraRef.current.srcObject;
    const cameraTrack = cameraStream.getVideoTracks()[0];
    mediaRecorderRef.current.stream.addTrack(cameraTrack);
  };

  const handleStopRecordClick = () => {
    console.log('handleStopRecordClick');
    debugger
    // mediaRecorderRef.current.mimeType = 'video/webm;codecs=h264';
    if (!mediaRecorderRef.current || !selectedVideo) {
      return;
    }

    mediaRecorderRef.current.stop();
  };

  mediaRecorderRef.current?.addEventListener('dataavailable', (event) => {
    console.log('dataavailable EventListener');
    console.log(event);
    console.log(event.data);
    // Add each chunk of recorded data to the state
    setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
  });

  mediaRecorderRef.current?.addEventListener('stop', () => {
    console.log('stop eventlistener');
    // Create a new Blob from the recorded chunks
    const recordedBlob = new Blob(recordedChunks, { type: 'video/webm;codecs=h264' });

    // Create a URL for the recorded Blob
    const videoURL = URL.createObjectURL(recordedBlob);

    // Download the recorded video
    const a = document.createElement('a');
    a.href = videoURL;
    a.download = 'recorded_video.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Reset the recorded chunks
    setRecordedChunks([]);
  });

  return (
    <div>
      <ul>
        {videos.map((video) => (
          <li key={video}>
            <Button onClick={() => handleVideoClick(video)}>{video}</Button>
          </li>
        ))}
      </ul>
      <Button disabled={!selectedVideo} onClick={handlePlayClick}>
        Play
      </Button>
      <Button onClick={handleCameraClick}>Open Camera</Button>
      {/* <Button
        disabled={!selectedVideo || !mediaRecorderRef.current}
        onClick={handleRecordClick}
      >
        Start Recording
      </Button> */}
      <Button onClick={handleRecordClick}>
        {/* disabled={!selectedVideo || !mediaRecorderRef.current?.stream} */}
        Start Recording
      </Button>

      <Button onClick={handleStopRecordClick}>
        {/* disabled={!selectedVideo || !mediaRecorderRef.current?.stream} */}
        Stop Recording
      </Button>
      {/* <div style={{ display: 'flex' }}>
        <video ref={videoRef} controls />
        <video ref={cameraRef} width="320" height="240" controls />
      </div> */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {/* Video element */}
          <video ref={videoRef} controls style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div style={{ flex: 1 }}>
          {/* Camera element */}
          <video ref={cameraRef} style={{ maxWidth: '100%', height: '81.10%' }} />
        </div>
      </div>


    </div>
  );
}

export default VideoPlayer;
