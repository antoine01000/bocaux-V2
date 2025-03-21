import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const BocauxContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
`;

const AddButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3d8b40;
  }
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
`;

const BocauxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const BocalCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BocalImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const BocalInfo = styled.div`
  padding: 1.5rem;
`;

const BocalName = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const BocalDate = styled.p`
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const BocalQuantity = styled.p`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const BocalActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: background-color 0.3s;
`;

const ViewButton = styled(ActionButton)`
  background-color: var(--primary-color);
  color: white;

  &:hover {
    background-color: #3d8b40;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const EmptyStateText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #666;
`;

const BocauxList = () => {
  const [bocaux, setBocaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBocaux();
  }, []);

  const fetchBocaux = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bocaux')
        .select('*')
        .order('date_fabrication', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setBocaux(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des bocaux:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBocaux = bocaux.filter(bocal => 
    bocal.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <BocauxContainer>
      <Header>
        <Title>Mes Bocaux</Title>
        <AddButton to="/bocaux/ajouter">+ Ajouter un bocal</AddButton>
      </Header>

      <SearchBar>
        <SearchInput 
          type="text" 
          placeholder="Rechercher un bocal..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      {loading ? (
        <p>Chargement des bocaux...</p>
      ) : filteredBocaux.length > 0 ? (
        <BocauxGrid>
          {filteredBocaux.map((bocal) => (
            <BocalCard key={bocal.id}>
              <BocalImage imageUrl={bocal.photo_url}>
                {!bocal.photo_url && 'Aucune image'}
              </BocalImage>
              <BocalInfo>
                <BocalName>{bocal.nom}</BocalName>
                <BocalDate>Fabriqué le: {formatDate(bocal.date_fabrication)}</BocalDate>
                <BocalDate>À consommer avant: {formatDate(bocal.date_limite_consommation)}</BocalDate>
                <BocalQuantity>Quantité: {bocal.quantite}</BocalQuantity>
                <BocalActions>
                  <ViewButton to={`/bocaux/${bocal.id}`}>Voir détails</ViewButton>
                </BocalActions>
              </BocalInfo>
            </BocalCard>
          ))}
        </BocauxGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>Aucun bocal trouvé. Commencez par en ajouter un !</EmptyStateText>
          <AddButton to="/bocaux/ajouter">+ Ajouter un bocal</AddButton>
        </EmptyState>
      )}
    </BocauxContainer>
  );
};

export default BocauxList;
