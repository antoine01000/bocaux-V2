import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const AlertCard = styled.div`
  background-color: ${props => props.isLow ? '#ffebee' : '#fff8e1'};
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AlertInfo = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.isLow ? 'var(--error-color)' : 'var(--secondary-color)'};
`;

const AlertQuantity = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-weight: bold;
`;

const AlertActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const ViewButton = styled(ActionButton)`
  background-color: var(--primary-color);
  color: white;
  border: none;

  &:hover {
    background-color: #3d8b40;
  }
`;

const DismissButton = styled(ActionButton)`
  background-color: white;
  color: #666;
  border: 1px solid #ddd;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const GrainesAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLowStockGraines();
  }, []);

  const fetchLowStockGraines = async () => {
    try {
      setLoading(true);
      
      // Récupérer les graines avec un stock faible (moins de 10 unités)
      const { data, error } = await supabase
        .from('graines')
        .select('*')
        .lt('quantite', 10)
        .order('quantite', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        // Transformer les données en alertes
        const alertsList = data.map(graine => {
          const isVeryLow = graine.quantite < 5;
          
          return {
            id: graine.id,
            title: `${graine.nom} - ${graine.variete}`,
            quantite: graine.quantite,
            isLow: isVeryLow,
            message: isVeryLow 
              ? `Stock très faible ! Il ne reste que ${graine.quantite} unité${graine.quantite > 1 ? 's' : ''}.` 
              : `Stock faible. Il reste ${graine.quantite} unités.`,
            graine
          };
        });
        
        setAlerts(alertsList);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <AlertsContainer>
      <h2>Alertes de stocks faibles</h2>
      
      {loading ? (
        <p>Chargement des alertes...</p>
      ) : alerts.length > 0 ? (
        alerts.map(alert => (
          <AlertCard key={alert.id} isLow={alert.isLow}>
            <AlertInfo>
              <AlertTitle isLow={alert.isLow}>
                {alert.title}
              </AlertTitle>
              <AlertQuantity>
                Quantité: {alert.quantite}
              </AlertQuantity>
              <p>{alert.message}</p>
            </AlertInfo>
            <AlertActions>
              <ViewButton onClick={() => window.location.href = `/graines/${alert.id}`}>
                Voir détails
              </ViewButton>
              <DismissButton onClick={() => handleDismiss(alert.id)}>
                Ignorer
              </DismissButton>
            </AlertActions>
          </AlertCard>
        ))
      ) : (
        <EmptyState>
          <p>Aucune alerte pour le moment. Tous vos stocks de graines sont suffisants.</p>
        </EmptyState>
      )}
    </AlertsContainer>
  );
};

export default GrainesAlerts;
