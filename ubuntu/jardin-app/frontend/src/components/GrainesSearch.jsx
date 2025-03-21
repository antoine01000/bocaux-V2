import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const SearchTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const SearchRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchField = styled.div`
  flex: 1;
  min-width: 200px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const SearchButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  border: none;

  &:hover {
    background-color: #3d8b40;
  }
`;

const ResetButton = styled(Button)`
  background-color: white;
  color: var(--text-color);
  border: 1px solid #ddd;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const AdvancedSearchToggle = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 0.5rem;
  align-self: flex-start;
`;

const GrainesSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVariete, setSearchVariete] = useState('');
  const [dateMin, setDateMin] = useState('');
  const [dateMax, setDateMax] = useState('');
  const [sortBy, setSortBy] = useState('date_recolte');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minQuantite, setMinQuantite] = useState('');
  const [maxQuantite, setMaxQuantite] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      let query = supabase
        .from('graines')
        .select('*');
      
      // Filtrer par nom si un terme de recherche est fourni
      if (searchTerm) {
        query = query.ilike('nom', `%${searchTerm}%`);
      }
      
      // Filtrer par variété si fournie
      if (searchVariete) {
        query = query.ilike('variete', `%${searchVariete}%`);
      }
      
      // Filtrer par date de récolte minimale si fournie
      if (dateMin) {
        query = query.gte('date_recolte', dateMin);
      }
      
      // Filtrer par date de récolte maximale si fournie
      if (dateMax) {
        query = query.lte('date_recolte', dateMax);
      }
      
      // Filtrer par quantité minimale si fournie
      if (minQuantite) {
        query = query.gte('quantite', minQuantite);
      }
      
      // Filtrer par quantité maximale si fournie
      if (maxQuantite) {
        query = query.lte('quantite', maxQuantite);
      }
      
      // Trier les résultats
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Passer les résultats au composant parent
      onSearch(data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSearchVariete('');
    setDateMin('');
    setDateMax('');
    setMinQuantite('');
    setMaxQuantite('');
    setSortBy('date_recolte');
    setSortOrder('desc');
    
    // Effectuer une recherche sans filtres pour réinitialiser les résultats
    onSearch(null);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSearch}>
        <SearchTitle>Rechercher des graines</SearchTitle>
        
        <SearchRow>
          <SearchField>
            <Label htmlFor="searchTerm">Nom du légume</Label>
            <Input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher..."
            />
          </SearchField>
          
          <SearchField>
            <Label htmlFor="searchVariete">Variété</Label>
            <Input
              type="text"
              id="searchVariete"
              value={searchVariete}
              onChange={(e) => setSearchVariete(e.target.value)}
              placeholder="Rechercher par variété..."
            />
          </SearchField>
        </SearchRow>
        
        <SearchRow>
          <SearchField>
            <Label htmlFor="sortBy">Trier par</Label>
            <Select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date_recolte">Date de récolte</option>
              <option value="date_limite_utilisation">Date limite d'utilisation</option>
              <option value="nom">Nom</option>
              <option value="variete">Variété</option>
              <option value="quantite">Quantité</option>
            </Select>
          </SearchField>
          
          <SearchField>
            <Label htmlFor="sortOrder">Ordre</Label>
            <Select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Décroissant</option>
              <option value="asc">Croissant</option>
            </Select>
          </SearchField>
        </SearchRow>
        
        {showAdvanced && (
          <>
            <SearchRow>
              <SearchField>
                <Label htmlFor="dateMin">Date de récolte (min)</Label>
                <Input
                  type="date"
                  id="dateMin"
                  value={dateMin}
                  onChange={(e) => setDateMin(e.target.value)}
                />
              </SearchField>
              
              <SearchField>
                <Label htmlFor="dateMax">Date de récolte (max)</Label>
                <Input
                  type="date"
                  id="dateMax"
                  value={dateMax}
                  onChange={(e) => setDateMax(e.target.value)}
                />
              </SearchField>
            </SearchRow>
            
            <SearchRow>
              <SearchField>
                <Label htmlFor="minQuantite">Quantité minimale</Label>
                <Input
                  type="number"
                  id="minQuantite"
                  min="0"
                  value={minQuantite}
                  onChange={(e) => setMinQuantite(e.target.value)}
                />
              </SearchField>
              
              <SearchField>
                <Label htmlFor="maxQuantite">Quantité maximale</Label>
                <Input
                  type="number"
                  id="maxQuantite"
                  min="0"
                  value={maxQuantite}
                  onChange={(e) => setMaxQuantite(e.target.value)}
                />
              </SearchField>
            </SearchRow>
          </>
        )}
        
        <AdvancedSearchToggle
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Masquer les options avancées' : 'Afficher les options avancées'}
        </AdvancedSearchToggle>
        
        <ButtonGroup>
          <ResetButton type="button" onClick={handleReset}>
            Réinitialiser
          </ResetButton>
          <SearchButton type="submit">
            Rechercher
          </SearchButton>
        </ButtonGroup>
      </SearchForm>
    </SearchContainer>
  );
};

export default GrainesSearch;
