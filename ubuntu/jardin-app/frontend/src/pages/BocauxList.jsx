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
  font-size: 1.75rem;
  margin: 0;
`;

const AddButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.25rem;
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

const BocalCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Conserve l'ancien fonctionnement : on passe l'URL en prop
const BocalImage = styled.div`
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${(props) => (props.$imageUrl ? `url(${props.$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const BocalContent = styled.div`
  padding: 1.5rem;
`;

const BocalType = styled.div`
  font-size: 0.875rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const BocalName = styled.h2`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
`;

const BocalInfo = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  margin-right: 0.25rem;
`;

/* ---------- NOUVEAU ------------ */
const QuantityControls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const QuantityButton = styled.button`
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:hover:not(:disabled) {
    background: #d4d4d4;
  }
`;
/* ------------------------------- */

const BocalNotes = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin: 0 0 0.75rem 0;
`;

const BocalActions = styled.div`
  margin-top: auto;
  display: flex;
  gap: 0.5rem;
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
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ffcdd2;
    color: #b71c1c;
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

const BocauxList = () => {
  const { bocaux, deleteBocal, updateBocal } = useData();
  const [loading, setLoading] = useState(true);

  /* Helper numérique sûr */
  const handleQuantityChange = async (bocal, delta) => {
    const current = Number(bocal.quantite) || 0;
    const newQuantity = current + delta;
    if (newQuantity < 0) return;

    try {
      await updateBocal(bocal.id, { ...bocal, quantite: newQuantity });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error);
      alert('Une erreur est survenue lors de la mise à jour de la quantité.');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bocal ?')) {
      try {
        await deleteBocal(id);
      } catch (error) {
        console.error('Erreur lors de la suppression du bocal:', error);
        alert('Une erreur est survenue lors de la suppression du bocal.');
      }
    }
  };

  if (loading) return <p>Chargement…</p>;

  return (
    <Container>
      <Header>
        <Title>Mes bocaux</Title>
        <AddButton to="/bocaux/ajouter">Ajouter un bocal</AddButton>
      </Header>

      {bocaux.length === 0 ? (
        <EmptyState>
          <EmptyStateText>Aucun bocal pour le moment.</EmptyStateText>
          <AddButton to="/bocaux/ajouter">Commencer</AddButton>
        </EmptyState>
      ) : (
        <Grid>
          {bocaux.map((bocal) => {
            const imageUrl = bocal.photo_url || bocal.type_photo || '';
            return (
              <BocalCard key={bocal.id}>
                <BocalImage $imageUrl={imageUrl}>
                  {!imageUrl && 'Pas d’image'}
                </BocalImage>

                <BocalContent>
                  <BocalType>{bocal.type_nom}</BocalType>
                  <BocalName>{bocal.contenu}</BocalName>

                  <BocalInfo>
                    <InfoLabel>Quantité :</InfoLabel>
                    <QuantityControls>
                      <QuantityButton
                        onClick={() => handleQuantityChange(bocal, -1)}
                        disabled={Number(bocal.quantite) <= 0}
                      >
                        –
                      </QuantityButton>
                      <span>{bocal.quantite}</span>
                      <QuantityButton onClick={() => handleQuantityChange(bocal, 1)}>
                        +
                      </QuantityButton>
                    </QuantityControls>
                  </BocalInfo>

                  <BocalInfo>
                    <InfoLabel>Date :</InfoLabel>
                    {new Date(bocal.date).toLocaleDateString()}
                  </BocalInfo>

                  {bocal.notes && <BocalNotes>{bocal.notes}</BocalNotes>}

                  <BocalActions>
                    <EditButton to={`/bocaux/modifier/${bocal.id}`}>Modifier</EditButton>
                    <DeleteButton onClick={() => handleDelete(bocal.id)}>
                      Supprimer
                    </DeleteButton>
                  </BocalActions>
                </BocalContent>
              </BocalCard>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default BocauxList;
