import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth-provider';

const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
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
    <div>
      <form>
        <div>Login</div>
        Username:
        <input type='text' name='username' id='username' value={username} onChange={setUsername} />
        <br />
        Password:
        <input type='password' name='password' id='password' value={password} onChange={setPassword} />
        <br />
        <button type='submit' onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
