import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import './Menu.css';
import { RiLogoutCircleRLine } from 'react-icons/ri';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//     maxWidth: 6000,
//   },
//   tab: {
//     color: "white"
//   }
// });

export const  Menu =()=> {

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutUser = () => {
    localStorage.setItem('userName', '')
    navigate('/')
  }
  return (
    <>
      <Paper square className={`nuv-bar-main `}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
          className="all-tabs"
        >
          <Tab
            label="Video Screen"
            component={Link}
            to="videoscreen"
            className=''
          />
          <Tab
            label="History"
            component={Link}
            to="history"
            className=''
          />
       <Tab
            label="Add Video"
            component={Link}
            to="addvideo"
            className=''
          />
        </Tabs>
        {localStorage.userName == "" && <div onClick={() => logoutUser()} style={{ color: '#EFA9B8', cursor: 'pointer', fontWeight: 'bold', textShadow: '1px 1px 2px #4c4c4c, 0 0 25px #88888d, 0 0 5px #7b7a7a' }}>Logout <RiLogoutCircleRLine style={{ color: '#EFA9B8', cursor: 'pointer', fontWeight: 'bold', textShadow: '1px 1px 2px #4c4c4c, 0 0 25px #88888d, 0 0 5px #7b7a7a !important' }} /></div>}

      </Paper>
    </>
  )
}


    // <Box sx={{ width: '100%', typography: 'body1' }}>
    //   <TabContext value={value}>
    //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //       <TabList onChange={handleChange} aria-label="lab API tabs example">
    //         <Tab label="Personal Erea" value="1" />
    //         <Tab label="Sign in" value="2" onClick={() => { navigate("/signIn") }} />
    //         <Tab label="Video Library" value="3" onClick={() => { navigate("/videoLibrary") }} />
    //       </TabList>
    //     </Box>
    //     <TabPanel value="1">Personal Erea</TabPanel>
    //     <TabPanel value="2">Sign in</TabPanel>
    //     <TabPanel value="3">Item Three</TabPanel>
    //   </TabContext>
    // </Box>
