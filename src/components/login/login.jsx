import { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from '../shared/UI/spinner';
import AlertMessage from '../shared/UI/alertMessage';
import { login, selectIsAuthenticated } from '../../store/slices/authSlice';
import users from '../../data/user.json';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Dish Poll {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dishes');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    // Validation
    if (!username || !password) {
      setError('Please enter both username and password');
      toast.error('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate async authentication
      await new Promise(resolve => setTimeout(resolve, 500));

      // Find user in static users list
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Prepare user info (exclude password)
      const userInfo = {
        id: user.id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
      };

      // Dispatch login action
      dispatch(login(userInfo));

      toast.success(`Welcome back, ${user.name}!`);
      
      // Navigate to dishes page
      navigate('/dishes');

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container 
        component="main" 
        maxWidth="xs" 
        sx={{ 
          backgroundColor: 'white', 
          borderRadius: 3, 
          py: 1, 
          mt: 10, 
          pt: 3,
          boxShadow: 3
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome To Dish Poll
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sign in to vote for your favorite dishes
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled={isLoading}
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
              disabled={isLoading}
            />

            {error && (
              <Box sx={{ mt: 2 }}>
                <AlertMessage severity='error'>{error}</AlertMessage>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                color: 'white',
                '&:hover': { 
                  backgroundColor: 'primary.dark' 
                }
              }}
            >
              {isLoading ? <Spinner /> : 'Log In'}
            </Button>

            {/* Demo credentials hint */}
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" display="block" gutterBottom>
                <strong>Demo Credentials:</strong>
              </Typography>
              <Typography variant="caption" display="block">
                Username: amar
              </Typography>
              <Typography variant="caption" display="block">
                Password: amar123
              </Typography>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}