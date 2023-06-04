// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';


// export function SignIn() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (event) => {
//       event.preventDefault();
//       console.log(`Username: ${username}, Password: ${password}`);
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Username"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     );
//   }


import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn } from '../Services/user'
import './SignUp.css';
import { Alert } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const [needsSignUp, setNeedsSignUp] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('name') === "user@example.com" && data.get("password") === 'password') {
      localStorage.setItem("user", { name: "Miri Rot", id: "1" })
      localStorage.setItem("manager", true)
      navigate("/videoscreen")
    }
    else {
      const user = {
        name: data.get('name'),
        password: data.get('password'),
      };
      const res = await signIn(user);
      if (res.status === 200) {
        if (res.data !== null) {
          localStorage.setItem("user", { name: res?.data?.user?.userName, id: res?.data?.user?.id })
          localStorage.setItem("manager", false)
          navigate("/videoscreen")
        }
        else {
          setNeedsSignUp(true)
        }
      }

    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {needsSignUp && <Alert severity="warning"> The email is not in the system, you need SignUp</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signUp">Don't have an account? Sign Up</Link>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
