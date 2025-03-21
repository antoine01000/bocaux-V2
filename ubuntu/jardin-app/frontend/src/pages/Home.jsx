import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Hero = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const FeatureDescription = styled.p`
  margin-bottom: 1.5rem;
`;

const Button = styled(Link)`
  display: inline-block;
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

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title>Gestion de Bocaux et Graines</Title>
        <Subtitle>
          Une application intuitive pour gérer efficacement vos bocaux de cuisine et votre collection de graines
        </Subtitle>
      </Hero>

      <FeaturesContainer>
        <FeatureCard>
          <FeatureTitle>Gestion des Bocaux</FeatureTitle>
          <FeatureDescription>
            Enregistrez vos bocaux avec leur nom, date de fabrication, date limite de consommation, 
            quantité disponible et plus encore. Recevez des notifications pour les dates limites approchant.
          </FeatureDescription>
          <Button to="/bocaux">Gérer mes bocaux</Button>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Gestion des Graines</FeatureTitle>
          <FeatureDescription>
            Cataloguez vos graines de légumes avec leur variété, date de récolte, date limite d'utilisation, 
            quantité en stock et informations supplémentaires. Recevez des alertes pour les stocks faibles.
          </FeatureDescription>
          <Button to="/graines">Gérer mes graines</Button>
        </FeatureCard>
      </FeaturesContainer>
    </HomeContainer>
  );
};

export default Home;
