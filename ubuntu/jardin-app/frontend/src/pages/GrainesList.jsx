import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const GrainesContainer = styled.div`
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

const GrainesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const GraineCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const GraineImage = styled.div`
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

const GraineInfo = styled.div`
  padding: 1.5rem;
`;

const GraineName = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const GraineVariete = styled.p`
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const GraineDate = styled.p`
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const GraineQuantity = styled.p`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const GraineActions = styled.div`
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

const GrainesList = () => {
  const [graines, setGraines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGraines();
  }, []);

  const fetchGraines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('graines')
        .select('*')
        .order('date_recolte', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setGraines(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des graines:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGraines = graines.filter(graine => 
    graine.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    graine.variete.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <GrainesContainer>
      <Header>
        <Title>Mes Graines</Title>
        <AddButton to="/graines/ajouter">+ Ajouter une graine</AddButton>
      </Header>

      <SearchBar>
        <SearchInput 
          type="text" 
          placeholder="Rechercher par nom ou variété..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      {loading ? (
        <p>Chargement des graines...</p>
      ) : filteredGraines.length > 0 ? (
        <GrainesGrid>
          {filteredGraines.map((graine) => (
            <GraineCard key={graine.id}>
              <GraineImage imageUrl={graine.photo_url}>
                {!graine.photo_url && 'Aucune image'}
              </GraineImage>
              <GraineInfo>
                <GraineName>{graine.nom}</GraineName>
                <GraineVariete>Variété: {graine.variete}</GraineVariete>
                <GraineDate>Récoltée le: {formatDate(graine.date_recolte)}</GraineDate>
                <GraineDate>À utiliser avant: {formatDate(graine.date_limite_utilisation)}</GraineDate>
                <GraineQuantity>Quantité: {graine.quantite}</GraineQuantity>
                <GraineActions>
                  <ViewButton to={`/graines/${graine.id}`}>Voir détails</ViewButton>
                </GraineActions>
              </GraineInfo>
            </GraineCard>
          ))}
        </GrainesGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>Aucune graine trouvée. Commencez par en ajouter une !</EmptyStateText>
          <AddButton to="/graines/ajouter">+ Ajouter une graine</AddButton>
        </EmptyState>
      )}
    </GrainesContainer>
  );
};

export default GrainesList;
