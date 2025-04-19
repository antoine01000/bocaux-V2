import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';
import { legumesData } from '../utils/foodData';

// Styles (réutilisés du GrainesForm.jsx)
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
  margin-bottom: 2rem;
  text-align: center;
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
  resize: vertical;
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
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  &:hover {
    background-color: #3d8b40;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #388e3c;
  background-color: #e8f5e9;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const CustomVarietyInput = styled.div`
  margin-top: 0.75rem;
`;

const GraineEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nom: '',
    variete: '',
    date_recolte: '',
    date_limite_utilisation: '',
    quantite: 1,
    photo_url: '',
    remarques: '',
    conditions_conservation: '',
    origine: '',
    rendement: ''
  });
  
  const [selectedLegume, setSelectedLegume] = useState('');
  const [selectedVariete, setSelectedVariete] = useState('');
  const [useCustomVariety, setUseCustomVariety] = useState(false);
  const [customVariety, setCustomVariety] = useState('');
  const [varietes, setVarietes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données de la graine existante
  useEffect(() => {
    const fetchGraine = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('graines')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Formater les dates pour l'affichage dans les champs de type date
          const formattedData = {
            ...data,
            date_recolte: data.date_recolte ? data.date_recolte.split('T')[0] : '',
            date_limite_utilisation: data.date_limite_utilisation ? data.date_limite_utilisation.split('T')[0] : ''
          };
          
          setFormData(formattedData);
          
          // Trouver le légume correspondant au nom
          const matchingLegume = legumesData.find(legume => 
            legume.varietes && legume.varietes.some(v => v.nom === data.variete)
          );
          
          if (matchingLegume) {
            setSelectedLegume(matchingLegume.id);
            setVarietes(matchingLegume.varietes || []);
            
            // Trouver la variété correspondante
            const matchingVariete = matchingLegume.varietes.find(v => v.nom === data.variete);
            if (matchingVariete) {
              setSelectedVariete(matchingVariete.id);
            } else {
              setUseCustomVariety(true);
              setCustomVariety(data.variete);
              setSelectedVariete('custom');
            }
          } else {
            // Si aucun légume correspondant n'est trouvé, considérer comme une variété personnalisée
            setUseCustomVariety(true);
            setCustomVariety(data.variete);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la graine:', error);
        setError('Impossible de charger les données de la graine. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGraine();
  }, [id]);

  // Mettre à jour les variétés lorsque le légume sélectionné change
  useEffect(() => {
    if (selectedLegume) {
      const selectedLegumeData = legumesData.find(legume => legume.id === selectedLegume);
      if (selectedLegumeData) {
        setVarietes(selectedLegumeData.varietes || []);
        setFormData(prev => ({
          ...prev,
          nom: selectedLegumeData.nom,
          photo_url: selectedLegumeData.photo
        }));
      }
    } else {
      setVarietes([]);
    }
  }, [selectedLegume]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLegumeChange = (e) => {
    const legumeId = e.target.value;
    setSelectedLegume(legumeId);
    setSelectedVariete('');
    setUseCustomVariety(false);
    setCustomVariety('');
  };

  const handleVarieteChange = (e) => {
    const varieteId = e.target.value;
    setSelectedVariete(varieteId);
    
    if (varieteId === 'custom') {
      setUseCustomVariety(true);
      setFormData(prev => ({
        ...prev,
        variete: customVariety
      }));
    } else if (varieteId) {
      setUseCustomVariety(false);
      const selectedVarieteData = varietes.find(v => v.id === varieteId);
      if (selectedVarieteData) {
        setFormData(prev => ({
          ...prev,
          variete: selectedVarieteData.nom,
          photo_url: selectedVarieteData.photo || formData.photo_url
        }));
      }
    }
  };

  const handleCustomVarietyChange = (e) => {
    const value = e.target.value;
    setCustomVariety(value);
    setFormData(prev => ({
      ...prev,
      variete: value
    }));
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
        date_limite_utilisation: formData.date_limite_utilisation || null
      };
      
      const { error } = await supabase
        .from('graines')
        .update(dataToSubmit)
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/graines');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la modification de la graine:', error);
      setError('Une erreur est survenue lors de la modification de la graine. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <FormContainer><p>Chargement des données...</p></FormContainer>;
  }

  return (
    <FormContainer>
      <FormCard>
        <Title>Modifier la graine</Title>
        
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
          {success && <SuccessMessage>Graine modifiée avec succès! Redirection...</SuccessMessage>}
          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate('/graines')}>
              Annuler
            </CancelButton>
            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default GraineEdit;
