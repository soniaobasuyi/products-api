import React from 'react';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <ProductList />
    </div>
  );
};

export default App;
