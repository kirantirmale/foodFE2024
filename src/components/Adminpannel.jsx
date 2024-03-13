import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import swal from 'sweetalert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                Kiran Tirmale
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

    const Navigate = useNavigate();

    let blankObject = { email: '', password: '' }
    const [obj, setobj] = useState(blankObject);

    const getValue = (e) => {
        setobj({ ...obj, [e.target.name]: e.target.value })
    }
    console.log("blankObject", blankObject)

    const save = async (x) => {
        x.preventDefault()
        if (obj.email == '' || obj.password == '') {
            swal({
                title: 'Email or Password is requride'
            })
            setobj({ ...blankObject })
        }
        else {
            getlogin(obj)
        }
    }

    const getlogin = async (obj) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        let responce = await fetch('http://localhost:4000/api/auth/login', requestOptions).then((res) => { return res.json() })
        if (responce?.role == "admin") {
            localStorage.setItem('token', responce.token)
            Navigate('/admin')
        } else {
            alert("Sign in only Admin")
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
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
                        Sign in only Admin
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={getValue}
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
                            onChange={getValue}
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
                            onClick={save}
                        >
                            Sign In
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            // variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        // onClick={save}

                        >
                            <NavLink to={"/home"}>Back To Home</NavLink>
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}