import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useAuth } from '../../auth/auth-provider';
import classes from './login.module.css';
import Button from '@mui/material/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        await auth.signIn({ username, password });
        navigate('/');
      } catch (e) {
        // alert(`Error while trying to login:\n${e.message}`);
      }
    } else {
      alert('missing username or password');
    }
  };

  return (
    <div className={classes.root}>
      <form className={classes.form}>
        <div className={classes.title}>Welcome</div>
        <TextField
          label='Username'
          InputProps={{
            name: 'username',
            id: 'username',
            value: username,
            autoComplete: 'on',
            onChange: (e) => setUsername(e.target.value),
          }}
        />
        <br />
        <TextField
          label='Password'
          InputProps={{
            name: 'password',
            id: 'password',
            type: 'password',
            value: password,
            autoComplete: 'on',
            onChange: (e) => setPassword(e.target.value),
          }}
        />

        <br />
        <Button className={classes.button} type='submit' variant='contained' onClick={handleSubmit}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
