import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';
import { legumesData } from '../utils/foodData';
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

const GrainesForm = () => {
  const navigate = useNavigate();
  const { addGraine } = useData();
  const [formData, setFormData] = useState({
    type: '',
    variete: '',
    quantite: '',
    date_recolte: new Date().toISOString().split('T')[0],
    date_peremption: '',
    notes: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typesLegumes, setTypesLegumes] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('graines_categories')
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
          
          setTypesLegumes(formattedData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // En cas d'erreur, utiliser les données par défaut
        setTypesLegumes(legumesData);
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
    
    if (!formData.type || !formData.variete || !formData.quantite || !formData.date_recolte) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Trouver les détails du type de légume sélectionné
      const selectedType = typesLegumes.find(type => type.id === formData.type);
      
      const newGraine = {
        type: formData.type,
        type_nom: selectedType ? selectedType.nom : '',
        type_photo: selectedType ? (selectedType.photo_url || selectedType.photo) : '', // Utiliser photo_url ou photo
        variete: formData.variete,
        quantite: formData.quantite,
        date_recolte: formData.date_recolte,
        date_peremption: formData.date_peremption ? formData.date_peremption : null,
        notes: formData.notes
      };
      
      await addGraine(newGraine);
      
      navigate('/graines');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la graine:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Ajouter des Graines</Title>
      
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <FormGroup>
          <Label htmlFor="type">Type de Légume *</Label>
          <Select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un type</option>
            {typesLegumes.map(type => (
              <option key={type.id} value={type.id}>
                {type.nom}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="variete">Variété *</Label>
          <Input
            type="text"
            id="variete"
            name="variete"
            value={formData.variete}
            onChange={handleChange}
            required
            placeholder="Ex: Coeur de Boeuf, Butternut, etc."
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
            placeholder="Ex: 50g, 100 graines, etc."
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="date_recolte">Date de Récolte *</Label>
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
          <Label htmlFor="date_peremption">Date de Péremption</Label>
          <Input
            type="date"
            id="date_peremption"
            name="date_peremption"
            value={formData.date_peremption}
            onChange={handleChange}
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
          {loading ? 'Enregistrement...' : 'Ajouter les Graines'}
        </Button>
      </Form>
    </Container>
  );
};

export default GrainesForm;
