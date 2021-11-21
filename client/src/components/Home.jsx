import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <div>Home</div>
      <Link to='/login'>Login</Link>
      <br />
      <Link to='/search'>Search</Link>
    </div>
  );
};

export default Home;
