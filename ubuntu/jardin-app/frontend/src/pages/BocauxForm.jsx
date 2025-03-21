import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { bocauxTypes } from '../utils/foodData';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 100px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const SubmitButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  border: none;

  &:hover {
    background-color: #3d8b40;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: var(--text-color);
  border: 1px solid #ddd;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ffebee;
  border-radius: var(--border-radius);
`;

const SuccessMessage = styled.div`
  color: var(--success-color);
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e8f5e9;
  border-radius: var(--border-radius);
`;

const ImagePreview = styled.div`
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin: 1rem auto;
  background-color: #f0f0f0;
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const BocauxForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    date_fabrication: new Date().toISOString().split('T')[0],
    date_limite_consommation: '',
    quantite: 1,
    photo_url: '',
    remarques: '',
    type: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTypeChange = (e) => {
    const typeId = e.target.value;
    setSelectedType(typeId);
    
    if (typeId) {
      const selectedBocalType = bocauxTypes.find(type => type.id === typeId);
      if (selectedBocalType) {
        setFormData(prev => ({
          ...prev,
          type: selectedBocalType.nom,
          photo_url: selectedBocalType.photo
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        type: '',
        photo_url: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.date_fabrication || formData.quantite < 1) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Préparer les données en gérant correctement les champs de date vides
      // et en excluant le champ 'type' qui n'existe pas dans la base de données
      const { type, ...dataToSubmit } = {
        ...formData,
        date_limite_consommation: formData.date_limite_consommation || null
      };

      const { error } = await supabase
        .from('bocaux')
        .insert([dataToSubmit]);

      if (error) {
        throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/bocaux');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bocal:', error);
      setError('Une erreur est survenue lors de l\'ajout du bocal. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormCard>
        <Title>Ajouter un nouveau bocal</Title>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nom">Nom de la préparation *</Label>
            <Input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Confiture de fraises maison, Sauce tomate basilic, etc."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="type">Type de préparation *</Label>
            <Select
              id="type"
              value={selectedType}
              onChange={handleTypeChange}
              required
            >
              <option value="">Sélectionnez un type</option>
              {bocauxTypes.map(type => (
                <option key={type.id} value={type.id}>{type.nom}</option>
              ))}
            </Select>
          </FormGroup>

          {formData.photo_url && (
            <ImagePreview imageUrl={formData.photo_url}>
              {!formData.photo_url && 'Aucune image'}
            </ImagePreview>
          )}

          <FormGroup>
            <Label htmlFor="date_fabrication">Date de fabrication *</Label>
            <Input
              type="date"
              id="date_fabrication"
              name="date_fabrication"
              value={formData.date_fabrication}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date_limite_consommation">Date limite de consommation</Label>
            <Input
              type="date"
              id="date_limite_consommation"
              name="date_limite_consommation"
              value={formData.date_limite_consommation}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="quantite">Quantité *</Label>
            <Input
              type="number"
              id="quantite"
              name="quantite"
              min="1"
              value={formData.quantite}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="remarques">Remarques ou notes particulières</Label>
            <TextArea
              id="remarques"
              name="remarques"
              value={formData.remarques}
              onChange={handleChange}
              placeholder="Ajoutez des notes sur la préparation, les ingrédients, etc."
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Bocal ajouté avec succès! Redirection...</SuccessMessage>}

          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate('/bocaux')}>
              Annuler
            </CancelButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default BocauxForm;
