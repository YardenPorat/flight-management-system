import Home from './components/home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import classes from './app.module.css';
import Login from './components/login/login';
import Search from './components/search/search';
import TopBar from './components/top-bar/top-bar';

function App() {
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
