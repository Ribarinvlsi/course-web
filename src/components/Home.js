import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/clients">Clients</Link></li>
          <li><Link to="/orders">Orders</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
