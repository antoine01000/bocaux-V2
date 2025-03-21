import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/supabaseClient';

// Création du contexte
const DataContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useData = () => useContext(DataContext);

// Fournisseur du contexte
export const DataProvider = ({ children }) => {
  const [bocaux, setBocaux] = useState([]);
  const [graines, setGraines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données initiales
  useEffect(() => {
    fetchBocaux();
    fetchGraines();
  }, []);

  // Récupérer tous les bocaux
  const fetchBocaux = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bocaux')
        .select('*')
        .order('date_fabrication', { ascending: false });

      if (error) throw error;
      setBocaux(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des bocaux:', error);
      setError('Impossible de charger les bocaux');
    } finally {
      setLoading(false);
    }
  };

  // Récupérer tous les graines
  const fetchGraines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('graines')
        .select('*')
        .order('date_recolte', { ascending: false });

      if (error) throw error;
      setGraines(data || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des graines:', error);
      setError('Impossible de charger les graines');
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un bocal
  const addBocal = async (bocal) => {
    try {
      const { data, error } = await supabase
        .from('bocaux')
        .insert([bocal])
        .select();

      if (error) throw error;
      setBocaux([...bocaux, data[0]]);
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bocal:', error);
      return { success: false, error: error.message };
    }
  };

  // Mettre à jour un bocal
  const updateBocal = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('bocaux')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      setBocaux(bocaux.map(bocal => bocal.id === id ? data[0] : bocal));
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Erreur lors de la mise à jour du bocal:', error);
      return { success: false, error: error.message };
    }
  };

  // Supprimer un bocal
  const deleteBocal = async (id) => {
    try {
      const { error } = await supabase
        .from('bocaux')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBocaux(bocaux.filter(bocal => bocal.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression du bocal:', error);
      return { success: false, error: error.message };
    }
  };

  // Ajouter une graine
  const addGraine = async (graine) => {
    try {
      const { data, error } = await supabase
        .from('graines')
        .insert([graine])
        .select();

      if (error) throw error;
      setGraines([...graines, data[0]]);
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la graine:', error);
      return { success: false, error: error.message };
    }
  };

  // Mettre à jour une graine
  const updateGraine = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('graines')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      setGraines(graines.map(graine => graine.id === id ? data[0] : graine));
      return { success: true, data: data[0] };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la graine:', error);
      return { success: false, error: error.message };
    }
  };

  // Supprimer une graine
  const deleteGraine = async (id) => {
    try {
      const { error } = await supabase
        .from('graines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setGraines(graines.filter(graine => graine.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression de la graine:', error);
      return { success: false, error: error.message };
    }
  };

  // Recherche avancée de bocaux
  const searchBocaux = async (filters) => {
    try {
      let query = supabase.from('bocaux').select('*');
      
      if (filters.searchTerm) {
        query = query.ilike('nom', `%${filters.searchTerm}%`);
      }
      
      if (filters.dateMin) {
        query = query.gte('date_fabrication', filters.dateMin);
      }
      
      if (filters.dateMax) {
        query = query.lte('date_fabrication', filters.dateMax);
      }
      
      query = query.order(filters.sortBy || 'date_fabrication', { 
        ascending: filters.sortOrder === 'asc' 
      });
      
      const { data, error } = await query;
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la recherche de bocaux:', error);
      return { success: false, error: error.message };
    }
  };

  // Recherche avancée de graines
  const searchGraines = async (filters) => {
    try {
      let query = supabase.from('graines').select('*');
      
      if (filters.searchTerm) {
        query = query.ilike('nom', `%${filters.searchTerm}%`);
      }
      
      if (filters.searchVariete) {
        query = query.ilike('variete', `%${filters.searchVariete}%`);
      }
      
      if (filters.dateMin) {
        query = query.gte('date_recolte', filters.dateMin);
      }
      
      if (filters.dateMax) {
        query = query.lte('date_recolte', filters.dateMax);
      }
      
      if (filters.minQuantite) {
        query = query.gte('quantite', filters.minQuantite);
      }
      
      if (filters.maxQuantite) {
        query = query.lte('quantite', filters.maxQuantite);
      }
      
      query = query.order(filters.sortBy || 'date_recolte', { 
        ascending: filters.sortOrder === 'asc' 
      });
      
      const { data, error } = await query;
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Erreur lors de la recherche de graines:', error);
      return { success: false, error: error.message };
    }
  };

  // Upload d'une image
  const uploadImage = async (file, folder) => {
    try {
      if (!file) return { success: false, error: 'Aucun fichier fourni' };
      
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;
      
      // Upload du fichier vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Obtenir l'URL publique de l'image
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      return { success: true, url: publicUrl };
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image:', error);
      return { success: false, error: error.message };
    }
  };

  // Valeur du contexte
  const value = {
    bocaux,
    graines,
    loading,
    error,
    fetchBocaux,
    fetchGraines,
    addBocal,
    updateBocal,
    deleteBocal,
    addGraine,
    updateGraine,
    deleteGraine,
    searchBocaux,
    searchGraines,
    uploadImage
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
