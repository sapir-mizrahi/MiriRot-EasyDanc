import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import css from './history.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import { useEffect } from 'react';
import { getHistoryUser } from '../Services/user';


export default function UserHistory() {
    const [hisrotyVideoArr, setHistoryVideoArr] = React.useState([
        { name: "Video Number 1", date: '22/05/2000' },
        { name: "Video Number 2", date: '25/05/2012' },
        { name: "Video Number 3", date: '22/05/2034' }
    ])

    useEffect(async () => {
        const res = await getHistoryUser(localStorage.user.id)
        if (res.status === 200) {
            setHistoryVideoArr(res?.data)
        }
    }, [])
    return (
        <>
            <div className='mainHistoryDiv' >
                <div className='lastVideos'>The last videos you've seen
                    {<List sx={{ width: '100%', maxWidth: '100%', marginLeft: 7 }}>
                        {hisrotyVideoArr?.map((item) =>
                            <ListItem>
                                <ListItemAvatar>
                                    <StarIcon style={{ color: '#E48F9F', marginRight: 10 }} fontSize='large' />
                                    <PlayCircleOutlineIcon style={{ color: '#E48F9F', marginRight: 10 }} fontSize='large' />
                                </ListItemAvatar>
                                <ListItemText primary={item?.name} secondary={item?.date} />
                            </ListItem>
                        )}


                    </List>}
                </div></div>
        </>

    );
}


