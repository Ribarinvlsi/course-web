import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ClientsList from './components/ClientsList';
import OrdersList from './components/OrdersList';
import ProductsList from './components/ProductsList';
import AddClient from './components/AddClient';
import AddOrder from './components/AddOrder';
import AddProduct from './components/AddProduct';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Product Store 🛒</h1>
        </header>
        <main className="App-main">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/clients">Clients</Link></li>
              <li><Link to="/orders">Orders</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact>
            <div className="main-container">
              <div className="main-content">
                <h2>Welcome to the Product Store</h2>
                <p>Select a section from the menu to manage your store.</p>
              </div>
            <img 
              className="main-picture" 
              src="https://img3.akspic.ru/crops/4/7/0/3/6/163074/163074-prirodnye_produkty-naturalnaya_pishha-ovoshh-produktovyj_magazin-zelenshhik-1920x1080.jpg" 
              alt="shop-picture" 
            />
            </div>
            </Route>
            <Route path="/products/add">
              <AddProduct />
            </Route>
            <Route path="/products">
              <ProductsList />
            </Route>
            <Route path="/clients/add">
              <AddClient />
            </Route>
            <Route path="/clients">
              <ClientsList />
            </Route>
            <Route path="/orders/add">
              <AddOrder />
            </Route>
            <Route path="/orders">
              <OrdersList />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
