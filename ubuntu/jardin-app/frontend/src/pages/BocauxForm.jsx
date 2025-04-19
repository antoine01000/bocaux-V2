import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';
import { bocauxTypes } from '../utils/foodData';
import { useData } from '../context/DataContext';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
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
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")  ;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
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

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
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

const BocauxForm = () => {
  const navigate = useNavigate();
  const { addBocal } = useData();
  const [formData, setFormData] = useState({
    type: '',
    contenu: '',
    quantite: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typeBocaux, setTypeBocaux] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('bocaux_categories')
          .select('*')
          .order('nom');
          
        if (error) throw error;
        
        if (data) {
          // Adapter le format des données pour correspondre à l'ancien format
          const formattedData = data.map(item => ({
            id: item.id,
            nom: item.nom,
            photo: item.photo_url
          }));
          
          setTypeBocaux(formattedData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // En cas d'erreur, utiliser les données par défaut
        setTypeBocaux(bocauxTypes);
      }
    };
    
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.type || !formData.quantite || !formData.date) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Trouver les détails du type de bocal sélectionné
      const selectedType = typeBocaux.find(type => type.id === formData.type);
      
      const newBocal = {
        type: formData.type,
        type_nom: selectedType ? selectedType.nom : '',
        type_photo: selectedType ? (selectedType.photo_url || selectedType.photo) : '', // Utiliser photo_url ou photo
        contenu: formData.contenu,
        quantite: formData.quantite,
        date: formData.date,
        notes: formData.notes
      };
      
      await addBocal(newBocal);
      
      navigate('/bocaux');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bocal:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Ajouter un Bocal</Title>
      
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="type">Type de Bocal *</Label>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un type</option>
            {typeBocaux.map(type => (
              <option key={type.id} value={type.id}>
                {type.nom}
              </option>
            ))}
          </Select>
        </FormGroup>
        
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
          <Label htmlFor="notes">Notes</Label>
          <TextArea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ajoutez des notes supplémentaires ici..."
          />
        </FormGroup>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Ajouter le Bocal'}
        </Button>
      </Form>
    </Container>
  );
};

export default BocauxForm;
