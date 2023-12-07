import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Adminlogin from './Adminlogin';

import Addproduct from './Addproduct';
import Home from './Home/Home';

import ViewProduct from './Viewproduct';
import Category from './Category';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import ProductList from './ProductList';

import OrderList from './OrderList';
import Customer from './Customer';



function App() {
  return (
    <Router>
      <div className='app'>
      <Routes>
        <Route path="/" Component={Adminlogin} />
        <Route path='/customer' Component={Customer}/>
        <Route path='/addproduct' Component={Addproduct}/>
        <Route path='/home' Component={Home}/>
        <Route path='category' Component={Category}/>
        <Route path='/viewproduct' Component={ViewProduct}/>
        <Route path='/register' Component={Register}/>
        <Route path='/userprofile' Component={UserProfile}/>
        <Route path='/productlist' Component={ProductList}/>
        <Route path='/orderList' Component={OrderList}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
