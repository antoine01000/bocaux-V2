import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { legumesData } from '../utils/foodData';

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

const CustomVarietyInput = styled.div`
  margin-top: 1rem;
`;

const GrainesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    variete: '',
    date_recolte: new Date().toISOString().split('T')[0],
    date_limite_utilisation: '',
    quantite: 1,
    photo_url: '',
    remarques: '',
    conditions_conservation: '',
    origine: '',
    rendement: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLegume, setSelectedLegume] = useState('');
  const [selectedVariete, setSelectedVariete] = useState('');
  const [varietes, setVarietes] = useState([]);
  const [useCustomVariety, setUseCustomVariety] = useState(false);
  const [customVariety, setCustomVariety] = useState('');

  // Mettre à jour les variétés disponibles lorsque le légume sélectionné change
  useEffect(() => {
    if (selectedLegume) {
      const legume = legumesData.find(l => l.id === selectedLegume);
      if (legume) {
        setVarietes(legume.varietes);
        setSelectedVariete(''); // Réinitialiser la variété sélectionnée
        setFormData(prev => ({
          ...prev,
          nom: legume.nom,
          variete: '',
          photo_url: ''
        }));
      }
    }
  }, [selectedLegume]);

  // Mettre à jour la photo lorsque la variété sélectionnée change
  useEffect(() => {
    if (selectedVariete && !useCustomVariety) {
      const variete = varietes.find(v => v.id === selectedVariete);
      if (variete) {
        setFormData(prev => ({
          ...prev,
          variete: variete.nom,
          photo_url: variete.photo
        }));
      }
    }
  }, [selectedVariete, varietes, useCustomVariety]);

  // Mettre à jour la variété personnalisée
  useEffect(() => {
    if (useCustomVariety) {
      setFormData(prev => ({
        ...prev,
        variete: customVariety,
        photo_url: ''
      }));
    }
  }, [customVariety, useCustomVariety]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLegumeChange = (e) => {
    setSelectedLegume(e.target.value);
    setUseCustomVariety(false);
  };

  const handleVarieteChange = (e) => {
    if (e.target.value === 'custom') {
      setUseCustomVariety(true);
      setSelectedVariete('');
    } else {
      setUseCustomVariety(false);
      setSelectedVariete(e.target.value);
    }
  };

  const handleCustomVarietyChange = (e) => {
    setCustomVariety(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.variete || !formData.date_recolte || formData.quantite < 1) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Préparer les données en gérant correctement les champs de date vides
      const dataToSubmit = {
        ...formData,
        // Si date_limite_utilisation est vide, on la définit à null
        date_limite_utilisation: formData.date_limite_utilisation || null
      };

      const { error } = await supabase
        .from('graines')
        .insert([dataToSubmit]);

      if (error) {
        throw error;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/graines');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la graine:', error);
      setError('Une erreur est survenue lors de l\'ajout de la graine. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormCard>
        <Title>Ajouter une nouvelle graine</Title>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="legume">Type de légume *</Label>
            <Select
              id="legume"
              value={selectedLegume}
              onChange={handleLegumeChange}
              required
            >
              <option value="">Sélectionnez un légume</option>
              {legumesData.map(legume => (
                <option key={legume.id} value={legume.id}>{legume.nom}</option>
              ))}
            </Select>
          </FormGroup>

          {selectedLegume && (
            <FormGroup>
              <Label htmlFor="variete">Variété *</Label>
              <Select
                id="variete"
                value={useCustomVariety ? 'custom' : selectedVariete}
                onChange={handleVarieteChange}
                required
              >
                <option value="">Sélectionnez une variété</option>
                {varietes.map(variete => (
                  <option key={variete.id} value={variete.id}>{variete.nom}</option>
                ))}
                <option value="custom">Autre (saisie manuelle)</option>
              </Select>
              
              {useCustomVariety && (
                <CustomVarietyInput>
                  <Input
                    type="text"
                    placeholder="Saisissez le nom de la variété"
                    value={customVariety}
                    onChange={handleCustomVarietyChange}
                    required
                  />
                </CustomVarietyInput>
              )}
            </FormGroup>
          )}

          {formData.photo_url && (
            <ImagePreview imageUrl={formData.photo_url}>
              {!formData.photo_url && 'Aucune image'}
            </ImagePreview>
          )}

          <FormGroup>
            <Label htmlFor="date_recolte">Date de récolte *</Label>
            <Input
              type="date"
              id="date_recolte"
              name="date_recolte"
              value={formData.date_recolte}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="date_limite_utilisation">Date limite d'utilisation</Label>
            <Input
              type="date"
              id="date_limite_utilisation"
              name="date_limite_utilisation"
              value={formData.date_limite_utilisation}
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
            <Label htmlFor="conditions_conservation">Conditions de conservation</Label>
            <TextArea
              id="conditions_conservation"
              name="conditions_conservation"
              value={formData.conditions_conservation}
              onChange={handleChange}
              placeholder="Température, humidité, etc."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="origine">Origine des graines</Label>
            <Input
              type="text"
              id="origine"
              name="origine"
              value={formData.origine}
              onChange={handleChange}
              placeholder="Producteur, région, etc."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="rendement">Rendement observé</Label>
            <TextArea
              id="rendement"
              name="rendement"
              value={formData.rendement}
              onChange={handleChange}
              placeholder="Notes sur le rendement des cultures précédentes"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="remarques">Remarques ou notes supplémentaires</Label>
            <TextArea
              id="remarques"
              name="remarques"
              value={formData.remarques}
              onChange={handleChange}
              placeholder="Autres informations utiles"
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Graine ajoutée avec succès! Redirection...</SuccessMessage>}

          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate('/graines')}>
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

export default GrainesForm;
