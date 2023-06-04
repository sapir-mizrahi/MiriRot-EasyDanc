
import React, { useState, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi';
import { addLocalVideo } from '../Services/user';
import './AddVideo.css';
import { Box, Modal, Typography } from '@mui/material';

function AddVideo() {
    const [packageImg, setPackageImg] = useState('');
    const [localLocation, setLocalLocation] = useState('');
    const [videoName, setVideoName] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const onChangeHandlerImg = (e) => {
        const event = e.target.files[0]
        setLocalLocation(event?.name)
        const reader = new FileReader();
        const file = event;
        reader.onloadend = () => {
            setPackageImg(reader.result);
        };
        reader.readAsDataURL(file);
        var fileToUpload = event
        var myFile = new FormData();
        myFile.append("file", fileToUpload);
    }

    const addVideo = async () => {
        // const res = await addLocalVideo(videoName, localLocation)
        // if (res?.status===200) {
        setOpenModal(true)
        // }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div className='add-video-screen row'>
            <label className='title-inputs-video'>Upload New Video</label>
            <form className='package-img-div row' noValidate autoComplete="off" style={{
                display: 'flex'
            }}>
                <label className='lable-upload-img' for="profileImg">
                    <div className='icon-add-video'><BiImageAdd /></div>
                    {console.log("p", packageImg)}
                    {/* {packageImg !== '' && <img className={packageImg !== '' ? "package-img-img" : ''} referrerpolicy="no-referrer" src={packageImg} />} */}
                    {packageImg !== '' && <video style={{ borderRadius: '20px' }} id="video1" className="video-kosher" width="404" height="300" controls>
                        <source src={packageImg} type="video/mp4" />
                    </video>}
                </label>
                <input
                    type={"file"}
                    id="profileImg"
                    htmlFor="myInput"
                    accept="mp4"
                    style={{
                        display: 'none',
                        cursor: 'pointer'
                    }}
                    onChange={(e) => onChangeHandlerImg(e)}
                /></form>
            <button className='btn-save-video' onClick={() => addVideo()}>Save</button>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        The video has been successfully saved!
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default AddVideo;
