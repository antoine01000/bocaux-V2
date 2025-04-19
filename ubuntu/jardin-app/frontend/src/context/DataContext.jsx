import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

// Créer le contexte
const DataContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useData = () => useContext(DataContext);

// Fournisseur de données
export const DataProvider = ({ children }) => {
  // États
  const [bocaux, setBocaux] = useState([]);
  const [graines, setGraines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données au montage du composant
  useEffect(() => {
    fetchBocaux();
    fetchGraines();
  }, []);

  // Fonction pour générer un ID unique
  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Récupérer les bocaux depuis Supabase
  const fetchBocaux = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('bocaux')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setBocaux(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des bocaux:', error);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les graines depuis Supabase
  const fetchGraines = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('graines')
        .select('*')
        .order('date_recolte', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        setGraines(data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des graines:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter un bocal
  const addBocal = async (bocalData) => {
    try {
      const newBocal = {
        id: generateUniqueId(),
        ...bocalData,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('bocaux')
        .insert([newBocal]);
        
      if (error) throw error;
      
      setBocaux(prevBocaux => [newBocal, ...prevBocaux]);
      
      return newBocal;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du bocal:', error);
      throw error;
    }
  };

  // Mettre à jour un bocal
  const updateBocal = async (id, bocalData) => {
    try {
      const updatedBocal = {
        ...bocalData,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('bocaux')
        .update(updatedBocal)
        .eq('id', id);
        
      if (error) throw error;
      
      setBocaux(prevBocaux => 
        prevBocaux.map(bocal => 
          bocal.id === id ? { ...bocal, ...updatedBocal } : bocal
        )
      );
      
      return updatedBocal;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du bocal:', error);
      throw error;
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
      
      setBocaux(prevBocaux => prevBocaux.filter(bocal => bocal.id !== id));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du bocal:', error);
      throw error;
    }
  };

  // Ajouter une graine
  const addGraine = async (graineData) => {
    try {
      // S'assurer que les dates vides sont null et non des chaînes vides
      const sanitizedData = {
        ...graineData,
        date_peremption: graineData.date_peremption || null
      };
      
      const newGraine = {
        id: generateUniqueId(),
        ...sanitizedData,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('graines')
        .insert([newGraine]);
        
      if (error) throw error;
      
      setGraines(prevGraines => [newGraine, ...prevGraines]);
      
      return newGraine;
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la graine:', error);
      throw error;
    }
  };

  // Mettre à jour une graine
  const updateGraine = async (id, graineData) => {
    try {
      const updatedGraine = {
        ...graineData,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('graines')
        .update(updatedGraine)
        .eq('id', id);
        
      if (error) throw error;
      
      setGraines(prevGraines => 
        prevGraines.map(graine => 
          graine.id === id ? { ...graine, ...updatedGraine } : graine
        )
      );
      
      return updatedGraine;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la graine:', error);
      throw error;
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
      
      setGraines(prevGraines => prevGraines.filter(graine => graine.id !== id));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la graine:', error);
      throw error;
    }
  };

  // Valeur du contexte
  const value = {
    bocaux,
    graines,
    loading,
    fetchBocaux,
    fetchGraines,
    addBocal,
    updateBocal,
    deleteBocal,
    addGraine,
    updateGraine,
    deleteGraine
  };

  // Rendu du fournisseur
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
