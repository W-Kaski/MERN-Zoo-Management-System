import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    Button,
    Grid,
    Box,
    Typography,
    Paper,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    IconButton,
    InputAdornment,
    CircularProgress,
    Backdrop
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg"
import {LightPurpleButton} from '../components/buttonStyles';
import styled from 'styled-components';
import {loginUser} from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({role}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {status, currentUser, response, error, currentRole} = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({
        emailError: false,
        passwordError: false,
        employeeIDError: false,
        employeeNameError: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const info = {};

        if (role === "Zookeeper") {
            info.employeeID = event.target.employeeID.value;
            info.employeeName = event.target.employeeName.value;
            const fields = {employeeID, employeeName, password}
        } else {
            const fields = {email, password}
            info.email = event.target.email.value;
            info.password = event.target.password.value;
        }

        // If there are errors, set corresponding error states
        let flag = false;
        for (const value in info) {
            if (!info[value]) {
                // Dynamically set the error state
                setErrors(prev => ({
                    ...prev,
                    [`${value}Error`]: true
                }));
                flag = true;
            }
        }
        if (flag) return;

        setLoader(true)
        dispatch(loginUser(fields, role))
    };

    const handleInputChange = (event) => {
        const {name} = event.target;
        setErrors(prev => ({
            ...prev,
            [`${name}Error`]: true
        }));
    };

    const guestModeHandler = () => {
        // Only visitors have a guest mode
        if (role === "Visitor") {
            const email = "tony@12"  // ?
            const fields = {email, password}
            const password = "123456"
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Zookeeper') {
                navigate('/Zookeeper/dashboard');
            } else if (currentRole === 'Visitor') {
                navigate('/Visitor/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        } else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" sx={{mb: 2, color: "#2c2143"}}>
                            {role} Login
                        </Typography>
                        <Typography variant="h7">
                            Welcome back! Please enter your details
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 2}}>
                            {role === "Zookeeper" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="employeeID"
                                        label="Enter your employee ID"
                                        name="employeeID"
                                        autoComplete="off"
                                        type="number"
                                        autoFocus
                                        error={errors["employeeIDError"]}
                                        helperText={errors["employeeIDError"] && 'Employee ID is required'}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="employeeName"
                                        label="Enter your name"
                                        name="employeeName"
                                        autoComplete="name"
                                        autoFocus
                                        error={errors["employeeNameError"]}
                                        helperText={errors["employeeIDError"] && 'Name is required'}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={errors["emailError"]}
                                    helperText={errors["emailError"] && 'Email is required'}
                                    onChange={handleInputChange}
                                />
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={errors["passwordError"]}
                                helperText={errors["passwordError"] && 'Password is required'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility/>
                                                ) : (
                                                    <VisibilityOff/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container sx={{display: "flex", justifyContent: "space-between"}}>
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary"/>}
                                    label="Remember me"
                                />
                                <StyledLink href="#">
                                    Forgot password?
                                </StyledLink>
                            </Grid>
                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3}}
                            >
                                {loader ?
                                    <CircularProgress size={24} color="inherit"/>
                                    : "Login"}
                            </LightPurpleButton>
                            <Button
                                fullWidth
                                onClick={guestModeHandler}
                                variant="outlined"
                                sx={{mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da"}}
                            >
                                Login as Guest
                            </Button>
                            {role === "Admin" &&
                                <Grid container>
                                    <Grid>
                                        Don't have an account?
                                    </Grid>
                                    <Grid item sx={{ml: 2}}>
                                        <StyledLink to="/Adminregister">
                                            Sign up
                                        </StyledLink>
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={guestLoader}
            >
                <CircularProgress color="primary"/>
                Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup}/>
        </ThemeProvider>
    );
}

export default LoginPage

const StyledLink = styled(Link)`
    margin-top: 9px;
    text-decoration: none;
    color: #7f56da;
`;
