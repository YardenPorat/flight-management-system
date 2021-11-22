import Logo from './logo.jpeg';
import classes from './home.module.css';

const Home = () => {
  return (
    <div className={classes.hero}>
      <img className={classes.logo} src={Logo} alt='aeroflight-logo' />
    </div>
  );
};

export default Home;
