import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabaseUrl = 'https://iunfihikvlarustuhamo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bmZpaGlrdmxhcnVzdHVoYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTUyMTksImV4cCI6MjA1NDY5MTIxOX0.NgFr1RMhT4eoOJgps73LFOHUexZ6vFCtejcBBqylRXI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour vérifier si une table existe
async function checkTableExists(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error && error.code === '42P01') {
      console.log(`La table ${tableName} n'existe pas.`);
      return false;
    } else {
      console.log(`La table ${tableName} existe.`);
      return true;
    }
  } catch (error) {
    console.error(`Erreur lors de la vérification de la table ${tableName}:`, error);
    return false;
  }
}

// Fonction pour créer la table bocaux
async function createBocauxTable() {
  try {
    const { data, error } = await supabase
      .from('bocaux')
      .insert([
        {
          nom: 'Test Bocal',
          date_fabrication: new Date().toISOString().split('T')[0],
          quantite: 1
        }
      ]);
    
    if (error) {
      console.error('Erreur lors de la création de la table bocaux:', error);
      return false;
    }
    
    console.log('Table bocaux créée avec succès ou déjà existante');
    return true;
  } catch (error) {
    console.error('Exception lors de la création de la table bocaux:', error);
    return false;
  }
}

// Fonction pour créer la table graines
async function createGrainesTable() {
  try {
    const { data, error } = await supabase
      .from('graines')
      .insert([
        {
          nom: 'Test Graine',
          variete: 'Test Variété',
          date_recolte: new Date().toISOString().split('T')[0],
          quantite: 1
        }
      ]);
    
    if (error) {
      console.error('Erreur lors de la création de la table graines:', error);
      return false;
    }
    
    console.log('Table graines créée avec succès ou déjà existante');
    return true;
  } catch (error) {
    console.error('Exception lors de la création de la table graines:', error);
    return false;
  }
}

// Fonction principale
async function main() {
  console.log('Vérification et création des tables dans Supabase...');
  
  // Vérifier si les tables existent
  const bocauxExists = await checkTableExists('bocaux');
  const grainesExists = await checkTableExists('graines');
  
  // Créer les tables si elles n'existent pas
  if (!bocauxExists) {
    await createBocauxTable();
  }
  
  if (!grainesExists) {
    await createGrainesTable();
  }
  
  console.log('Processus terminé.');
}

// Exécuter la fonction principale
main();
