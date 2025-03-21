import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';

const NotificationsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const NotificationCard = styled.div`
  background-color: ${props => props.isExpired ? '#ffebee' : '#fff8e1'};
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationInfo = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: ${props => props.isExpired ? 'var(--error-color)' : 'var(--secondary-color)'};
`;

const NotificationDate = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const NotificationActions = styled.div`
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

const BocauxNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBocauxWithExpirationDates();
  }, []);

  const fetchBocauxWithExpirationDates = async () => {
    try {
      setLoading(true);
      
      // Récupérer la date actuelle
      const today = new Date();
      
      // Ajouter 30 jours à la date actuelle pour les notifications à venir
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      
      // Formater les dates pour la requête SQL
      const todayFormatted = today.toISOString().split('T')[0];
      const thirtyDaysFromNowFormatted = thirtyDaysFromNow.toISOString().split('T')[0];
      
      // Récupérer les bocaux dont la date limite est dépassée ou approche
      const { data, error } = await supabase
        .from('bocaux')
        .select('*')
        .or(`date_limite_consommation.lte.${todayFormatted},and(date_limite_consommation.gt.${todayFormatted},date_limite_consommation.lte.${thirtyDaysFromNowFormatted})`)
        .order('date_limite_consommation', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        // Transformer les données en notifications
        const notificationsList = data.map(bocal => {
          const expirationDate = new Date(bocal.date_limite_consommation);
          const isExpired = expirationDate <= today;
          const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
          
          return {
            id: bocal.id,
            title: bocal.nom,
            date: bocal.date_limite_consommation,
            isExpired,
            message: isExpired 
              ? `Ce bocal a dépassé sa date limite de consommation.` 
              : `Ce bocal atteindra sa date limite de consommation dans ${daysUntilExpiration} jour${daysUntilExpiration > 1 ? 's' : ''}.`,
            bocal
          };
        });
        
        setNotifications(notificationsList);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <NotificationsContainer>
      <h2>Notifications des dates limites</h2>
      
      {loading ? (
        <p>Chargement des notifications...</p>
      ) : notifications.length > 0 ? (
        notifications.map(notification => (
          <NotificationCard key={notification.id} isExpired={notification.isExpired}>
            <NotificationInfo>
              <NotificationTitle isExpired={notification.isExpired}>
                {notification.title}
              </NotificationTitle>
              <NotificationDate>
                Date limite: {formatDate(notification.date)}
              </NotificationDate>
              <p>{notification.message}</p>
            </NotificationInfo>
            <NotificationActions>
              <ViewButton onClick={() => window.location.href = `/bocaux/${notification.id}`}>
                Voir détails
              </ViewButton>
              <DismissButton onClick={() => handleDismiss(notification.id)}>
                Ignorer
              </DismissButton>
            </NotificationActions>
          </NotificationCard>
        ))
      ) : (
        <EmptyState>
          <p>Aucune notification pour le moment. Tous vos bocaux sont dans les délais de consommation.</p>
        </EmptyState>
      )}
    </NotificationsContainer>
  );
};

export default BocauxNotifications;
