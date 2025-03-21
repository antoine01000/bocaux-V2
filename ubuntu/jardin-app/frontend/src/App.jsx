import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BocauxList from './pages/BocauxList';
import BocauxForm from './pages/BocauxForm';
import GrainesList from './pages/GrainesList';
import GrainesForm from './pages/GrainesForm';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  font-family: 'Roboto', sans-serif;
`;

const MainContent = styled.main`
  padding-top: 1rem;
`;

function App() {
  return (
    <DataProvider>
      <AppContainer>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bocaux" element={<BocauxList />} />
            <Route path="/bocaux/ajouter" element={<BocauxForm />} />
            <Route path="/bocaux/:id" element={<div>Détails du bocal en construction</div>} />
            <Route path="/graines" element={<GrainesList />} />
            <Route path="/graines/ajouter" element={<GrainesForm />} />
            <Route path="/graines/:id" element={<div>Détails de la graine en construction</div>} />
          </Routes>
        </MainContent>
      </AppContainer>
    </DataProvider>
  );
}

export default App;
