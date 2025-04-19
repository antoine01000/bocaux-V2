import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../context/DataContext';

const Container = styled.div`
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
  margin: 0;
`;

const AddButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3d8b40;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
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
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const GraineContent = styled.div`
  padding: 1.5rem;
`;

const GraineType = styled.div`
  font-size: 0.875rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const GraineName = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

const GraineInfo = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  margin-right: 0.5rem;
`;

const GraineNotes = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-style: italic;
  color: #666;
`;

const GraineActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const EditButton = styled(Link)`
  background-color: #f0f0f0;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DeleteButton = styled.button`
  background-color: #ffebee;
  color: #d32f2f;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ffcdd2;
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
  color: #666;
  margin-bottom: 1.5rem;
`;

const GrainesList = () => {
  const { graines, deleteGraine } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette graine ?')) {
      try {
        await deleteGraine(id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la graine:', error);
        alert('Une erreur est survenue lors de la suppression de la graine.');
      }
    }
  };

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>Mes Graines</Title>
        </Header>
        <div>Chargement...</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Mes Graines</Title>
        <AddButton to="/graines/ajouter">+ Ajouter des Graines</AddButton>
      </Header>
      
      {graines.length === 0 ? (
        <EmptyState>
          <EmptyStateText>Vous n'avez pas encore ajouté de graines.</EmptyStateText>
          <AddButton to="/graines/ajouter">Ajouter vos premières graines</AddButton>
        </EmptyState>
      ) : (
        <Grid>
          {graines.map(graine => (
            <GraineCard key={graine.id}>
              <GraineImage $imageUrl={graine.type_photo}>
                {!graine.type_photo && 'Aucune image'}
              </GraineImage>
              <GraineContent>
                <GraineType>{graine.type_nom}</GraineType>
                <GraineName>{graine.variete}</GraineName>
                <GraineInfo>
                  <InfoLabel>Quantité:</InfoLabel> {graine.quantite}
                </GraineInfo>
                <GraineInfo>
                  <InfoLabel>Date de récolte:</InfoLabel> {new Date(graine.date_recolte).toLocaleDateString()}
                </GraineInfo>
                {graine.date_peremption && (
                  <GraineInfo>
                    <InfoLabel>Date de péremption:</InfoLabel> {new Date(graine.date_peremption).toLocaleDateString()}
                  </GraineInfo>
                )}
                {graine.notes && <GraineNotes>{graine.notes}</GraineNotes>}
                <GraineActions>
                  <EditButton to={`/graines/modifier/${graine.id}`}>Modifier</EditButton>
                  <DeleteButton onClick={() => handleDelete(graine.id)}>Supprimer</DeleteButton>
                </GraineActions>
              </GraineContent>
            </GraineCard>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GrainesList;
