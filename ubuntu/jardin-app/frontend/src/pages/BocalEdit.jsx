import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';
import { bocauxTypes } from '../utils/foodData';
import { useData } from '../context/DataContext';

// Styles (réutilisés du BocauxForm.jsx)
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

const BocalEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchBocaux } = useData();
  
  const [formData, setFormData] = useState({
    type: '',
    contenu: '',
    quantite: 1,
    date: '',
    notes: '',
    photo_url: '',
    type_nom: ''
  });
  
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données du bocal existant
  useEffect(() => {
    const fetchBocal = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('bocaux')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Adapter les données au format du formulaire
          const formattedData = {
            ...data,
            // Utiliser les noms de champs du formulaire d'ajout
            type: data.type || '',
            contenu: data.contenu || data.nom || '',
            date: data.date || (data.date_fabrication ? data.date_fabrication.split('T')[0] : ''),
            quantite: data.quantite || 1,
            notes: data.notes || data.remarques || '',
            photo_url: data.photo_url || data.type_photo || '',
            type_nom: data.type_nom || ''
          };
          
          setFormData(formattedData);
          
          // Trouver le type correspondant
          if (data.type) {
            setSelectedType(data.type);
          } else {
            // Fallback: chercher par photo_url
            const matchingType = bocauxTypes.find(type => type.photo === data.photo_url);
            if (matchingType) {
              setSelectedType(matchingType.id);
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du bocal:', error);
        setError('Impossible de charger les données du bocal. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBocal();
  }, [id]);

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
    
    if (!formData.type || !formData.date || formData.quantite < 1) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Trouver les détails du type de bocal sélectionné
      const selectedBocalType = bocauxTypes.find(type => type.id === selectedType);
      
      // Préparer les données pour la mise à jour
      const updatedBocal = {
        type: selectedType,
        type_nom: selectedBocalType ? selectedBocalType.nom : formData.type_nom,
        type_photo: selectedBocalType ? selectedBocalType.photo : formData.photo_url,
        contenu: formData.contenu,
        quantite: formData.quantite,
        date: formData.date,
        notes: formData.notes,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('bocaux')
        .update(updatedBocal)
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setSuccess(true);
      
      // Attendre un court instant puis rediriger
      setTimeout(async () => {
        // Recharger les données avant de naviguer
        await fetchBocaux();
        navigate('/bocaux');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la modification du bocal:', error);
      setError('Une erreur est survenue lors de la modification du bocal. Veuillez réessayer.');
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
        <Title>Modifier le bocal</Title>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="type">Type de Bocal *</Label>
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
            <Label htmlFor="contenu">Contenu</Label>
            <Input
              type="text"
              id="contenu"
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
              placeholder="Ex: Confiture de fraises, Sauce tomate basilic, etc."
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">Date de Préparation *</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="quantite">Quantité *</Label>
            <Input
              type="text"
              id="quantite"
              name="quantite"
              value={formData.quantite}
              onChange={handleChange}
              required
              placeholder="Ex: 500ml, 1L, etc."
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="notes">Notes</Label>
            <TextArea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Ajoutez des notes supplémentaires ici..."
            />
          </FormGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Bocal modifié avec succès! Redirection...</SuccessMessage>}
          <ButtonGroup>
            <CancelButton type="button" onClick={() => navigate('/bocaux')}>
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

export default BocalEdit;
