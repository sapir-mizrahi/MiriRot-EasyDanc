import * as React from 'react';
import './VideoCards.css'
import { useState } from 'react';
import { addToHistory } from '../Services/user';

export default function MediaControlCard(props) {
  const { videosArr } = props;
  const [moreOrLess, setMoreOrLess] = useState("less");
  const [count, setCount] = useState(4);
  let index = 0;
  const setMoreOrLessVideos = () => {
    setMoreOrLess(moreOrLess == "less" ? 'more' : 'less')
    setCount(moreOrLess == "less" ? videosArr.length : 4)
  }
  const addVideoToHistory = async (id) => {
    await addToHistory(id, localStorage.user.id, new Date())
  }
  return (
    <>
      <div className='all-video-to-show'>
        {videosArr?.map((video) => {
          index++
          {
            return index <= count ? <div className='video-card-item' onClick={() => addVideoToHistory(video?.id)} >
              {video?.name}
            </div>
              : ''
          }
        })}
      </div >
      <div className='show-more' onClick={() => setMoreOrLessVideos()}>
        {moreOrLess == "less" ? 'Show More' : 'Show Less'}</div>
    </>
    // <Card sx={{ display: 'flex' }}>
    //   <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    //     <CardContent sx={{ flex: '1 0 auto' }}>
    //       <Typography component="div" variant="h5">
    //         Live From Space
    //       </Typography>
    //       <Typography variant="subtitle1" color="text.secondary" component="div">
    //         Mac Miller
    //       </Typography>
    //     </CardContent>
    //     <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
    //       {/* <IconButton aria-label="previous">
    //         {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
    //       </IconButton> */}
    //       <IconButton aria-label="play/pause">
    //         <PlayArrowIcon sx={{ height: 38, width: 38 }} />
    //       </IconButton>
    //       {/* <IconButton aria-label="next">
    //         {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
    //       </IconButton> */}
    //     </Box>
    //   </Box>
    //   <CardMedia
    //     component="img"
    //     sx={{ width: 145 }}
    //     // image="/static/images/cards/live-from-space.jpg"
    //     alt="Live from space album cover"
    //   />
    // </Card>
  );
}

