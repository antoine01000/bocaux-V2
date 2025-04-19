import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BocauxList from './pages/BocauxList';
import BocauxForm from './pages/BocauxForm';
import GrainesList from './pages/GrainesList';
import GrainesForm from './pages/GrainesForm';
import BocalEdit from './pages/BocalEdit';
import GraineEdit from './pages/GraineEdit';
import CategoriesManager from './pages/CategoriesManager';

function App() {
  return (
    <DataProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bocaux" element={<BocauxList />} />
        <Route path="/bocaux/ajouter" element={<BocauxForm />} />
        <Route path="/bocaux/modifier/:id" element={<BocalEdit />} />
        <Route path="/graines" element={<GrainesList />} />
        <Route path="/graines/ajouter" element={<GrainesForm />} />
        <Route path="/graines/modifier/:id" element={<GraineEdit />} />
        <Route path="/categories" element={<CategoriesManager />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
