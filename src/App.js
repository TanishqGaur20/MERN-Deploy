
import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js.map'
import Signup from './screens/Signup.js';
import { ContextReducer } from './components/ContextReducer.js';
import Cart from './screens/Cart.js';
import MyorderPage from './screens/MyorderPage.js';

function App() {
  return (
    <ContextReducer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/myorder' element={<MyorderPage />} />
        </Routes>
      </BrowserRouter>
    </ContextReducer>
  );
}

export default App;
