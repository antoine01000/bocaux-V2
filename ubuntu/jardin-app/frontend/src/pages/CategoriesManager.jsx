import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';
import { bocauxTypes, legumesData } from '../utils/foodData';
import PhotoUpload from '../components/PhotoUpload';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#f0f0f0'};
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CategoryCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: transform 0.3s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryImage = styled.div`
  height: 150px;
  background-color: #f0f0f0;
  background-image: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const CategoryInfo = styled.div`
  padding: 1rem;
`;

const CategoryName = styled.h3`
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const CategoryActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
`;

const EditButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ffebee;
  color: #d32f2f;
  &:hover {
    background-color: #ffcdd2;
  }
`;

const AddButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  margin-bottom: 1.5rem;
  &:hover {
    background-color: #3d8b40;
  }
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: var(--primary-color);
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SaveButton = styled(Button)`
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

const CategoriesManager = () => {
  const [activeTab, setActiveTab] = useState('bocaux');
  const [bocauxCategories, setBocauxCategories] = useState([]);
  const [grainesCategories, setGrainesCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    photo: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useCustomPhoto, setUseCustomPhoto] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Charger les catégories depuis Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Récupérer les catégories de bocaux
        const { data: bocauxData, error: bocauxError } = await supabase
          .from('bocaux_categories')
          .select('*')
          .order('nom');

        if (bocauxError) throw bocauxError;

        // Récupérer les catégories de graines
        const { data: grainesData, error: grainesError } = await supabase
          .from('graines_categories')
          .select('*')
          .order('nom');

        if (grainesError) throw grainesError;

        // Si aucune donnée n'existe encore, initialiser avec les données par défaut
        if (bocauxData.length === 0 && !initialDataLoaded) {
          await initializeDefaultCategories('bocaux', bocauxTypes);
          setBocauxCategories(bocauxTypes);
        } else {
          setBocauxCategories(bocauxData);
        }

        if (grainesData.length === 0 && !initialDataLoaded) {
          await initializeDefaultCategories('graines', legumesData);
          setGrainesCategories(legumesData);
        } else {
          setGrainesCategories(grainesData);
        }

        setInitialDataLoaded(true);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        // En cas d'erreur, utiliser les données par défaut
        setBocauxCategories(bocauxTypes);
        setGrainesCategories(legumesData);
      }
    };

    fetchCategories();
  }, []);

  // Fonction pour initialiser les tables avec les données par défaut
  const initializeDefaultCategories = async (type, defaultData) => {
    try {
      const tableName = type === 'bocaux' ? 'bocaux_categories' : 'graines_categories';
      
      // Préparer les données pour l'insertion
      const dataToInsert = defaultData.map(item => ({
        id: item.id,
        nom: item.nom,
        photo_url: item.photo
      }));
      
      // Insérer les données par défaut
      const { error } = await supabase
        .from(tableName)
        .insert(dataToInsert);
        
      if (error) throw error;
      
      console.log(`Données par défaut insérées dans ${tableName}`);
    } catch (error) {
      console.error(`Erreur lors de l'initialisation des données par défaut pour ${type}:`, error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openAddModal = () => {
    setCurrentCategory(null);
    setFormData({
      id: '',
      nom: '',
      photo: ''
    });
    setUseCustomPhoto(false);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setCurrentCategory(category);
    setFormData({
      id: category.id,
      nom: category.nom,
      photo: category.photo_url || category.photo // Compatibilité avec les deux formats
    });
    setUseCustomPhoto(false);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhotoUploaded = (photoUrl) => {
    setFormData({
      ...formData,
      photo: photoUrl
    });
  };

  const toggleCustomPhoto = () => {
    setUseCustomPhoto(!useCustomPhoto);
  };

  const generateId = (name) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.photo) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Générer un ID si c'est une nouvelle catégorie
      const categoryId = formData.id || generateId(formData.nom);
      
      const tableName = activeTab === 'bocaux' ? 'bocaux_categories' : 'graines_categories';
      const categoryData = {
        id: categoryId,
        nom: formData.nom,
        photo_url: formData.photo
      };
      
      if (currentCategory) {
        // Mise à jour d'une catégorie existante
        const { error } = await supabase
          .from(tableName)
          .update(categoryData)
          .eq('id', currentCategory.id);
          
        if (error) throw error;
      } else {
        // Ajout d'une nouvelle catégorie
        const { error } = await supabase
          .from(tableName)
          .insert([categoryData]);
          
        if (error) throw error;
      }
      
      // Recharger les catégories depuis Supabase
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('nom');
        
      if (error) throw error;
      
      if (activeTab === 'bocaux') {
        setBocauxCategories(data);
      } else {
        setGrainesCategories(data);
      }
      
      setSuccess('Catégorie enregistrée avec succès!');
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la catégorie:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category.nom}" ?`)) {
      try {
        const tableName = activeTab === 'bocaux' ? 'bocaux_categories' : 'graines_categories';
        
        // Supprimer la catégorie
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', category.id);
          
        if (error) throw error;
        
        // Recharger les catégories depuis Supabase
        const { data, error: fetchError } = await supabase
          .from(tableName)
          .select('*')
          .order('nom');
          
        if (fetchError) throw fetchError;
        
        if (activeTab === 'bocaux') {
          setBocauxCategories(data);
        } else {
          setGrainesCategories(data);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
        alert('Une erreur est survenue lors de la suppression de la catégorie.');
      }
    }
  };

  return (
    <Container>
      <Title>Gestion des Catégories</Title>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'bocaux'} 
          onClick={() => handleTabChange('bocaux')}
        >
          Types de Bocaux
        </Tab>
        <Tab 
          active={activeTab === 'graines'} 
          onClick={() => handleTabChange('graines')}
        >
          Types de Graines
        </Tab>
      </TabsContainer>
      
      <Card>
        <AddButton onClick={openAddModal}>
          + Ajouter une nouvelle catégorie
        </AddButton>
        
        <Grid>
          {activeTab === 'bocaux' ? (
            bocauxCategories.map(category => (
              <CategoryCard key={category.id}>
                <CategoryImage $imageUrl={category.photo_url || category.photo}>
                  {!category.photo_url && !category.photo && 'Aucune image'}
                </CategoryImage>
                <CategoryInfo>
                  <CategoryName>{category.nom}</CategoryName>
                  <CategoryActions>
                    <EditButton onClick={() => openEditModal(category)}>Modifier</EditButton>
                    <DeleteButton onClick={() => handleDelete(category)}>Supprimer</DeleteButton>
                  </CategoryActions>
                </CategoryInfo>
              </CategoryCard>
            ))
          ) : (
            grainesCategories.map(category => (
              <CategoryCard key={category.id}>
                <CategoryImage $imageUrl={category.photo_url || category.photo}>
                  {!category.photo_url && !category.photo && 'Aucune image'}
                </CategoryImage>
                <CategoryInfo>
                  <CategoryName>{category.nom}</CategoryName>
                  <CategoryActions>
                    <EditButton onClick={() => openEditModal(category)}>Modifier</EditButton>
                    <DeleteButton onClick={() => handleDelete(category)}>Supprimer</DeleteButton>
                  </CategoryActions>
                </CategoryInfo>
              </CategoryCard>
            ))
          )}
        </Grid>
      </Card>
      
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {currentCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
              </ModalTitle>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nom">Nom de la catégorie *</Label>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Confiture, Sauce tomate, etc."
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Image de la catégorie *</Label>
                <Button 
                  type="button" 
                  onClick={toggleCustomPhoto}
                  style={{ marginBottom: '1rem' }}
                >
                  {useCustomPhoto 
                    ? 'Utiliser une URL d\'image' 
                    : 'Télécharger une nouvelle image'}
                </Button>
                
                {useCustomPhoto ? (
                  <PhotoUpload 
                    onPhotoUploaded={handlePhotoUploaded} 
                    initialPhotoUrl={formData.photo}
                  />
                ) : (
                  <FormGroup>
                    <Label htmlFor="photo">URL de l'image *</Label>
                    <Input
                      type="text"
                      id="photo"
                      name="photo"
                      value={formData.photo}
                      onChange={handleChange}
                      required
                      placeholder="https://example.com/image.jpg"
                    />
                  </FormGroup>
                ) }
              </FormGroup>
              
              {formData.photo && (
                <CategoryImage $imageUrl={formData.photo} style={{ marginBottom: '1.5rem' }}>
                  {!formData.photo && 'Aucune image'}
                </CategoryImage>
              )}
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              
              <ButtonGroup>
                <CancelButton type="button" onClick={closeModal}>
                  Annuler
                </CancelButton>
                <SaveButton type="submit" disabled={loading}>
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </SaveButton>
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default CategoriesManager;
