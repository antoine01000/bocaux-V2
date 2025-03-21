import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabaseUrl = 'https://iunfihikvlarustuhamo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bmZpaGlrdmxhcnVzdHVoYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTUyMTksImV4cCI6MjA1NDY5MTIxOX0.NgFr1RMhT4eoOJgps73LFOHUexZ6vFCtejcBBqylRXI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction principale pour créer les tables
async function main() {
  try {
    console.log('Début de la création des tables dans Supabase...');
    
    // Création de la table bocaux
    const { error: bocauxError } = await supabase
      .from('bocaux')
      .insert({
        nom: 'Test Bocal',
        date_fabrication: new Date().toISOString().split('T')[0],
        quantite: 1
      })
      .select();
    
    if (bocauxError) {
      if (bocauxError.code === '42P01') { // Relation n'existe pas
        console.log('La table bocaux n\'existe pas encore, création en cours...');
        
        // Créer la table via SQL
        const { error: createBocauxError } = await supabase
          .rpc('exec_sql', {
            sql: `
              CREATE TABLE IF NOT EXISTS bocaux (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                nom VARCHAR(255) NOT NULL,
                date_fabrication DATE NOT NULL,
                date_limite_consommation DATE,
                quantite INTEGER NOT NULL,
                photo_url TEXT,
                remarques TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            `
          });
        
        if (createBocauxError) {
          console.error('Erreur lors de la création de la table bocaux:', createBocauxError);
        } else {
          console.log('Table bocaux créée avec succès');
        }
      } else {
        console.error('Erreur lors du test de la table bocaux:', bocauxError);
      }
    } else {
      console.log('La table bocaux existe déjà');
    }
    
    // Création de la table graines
    const { error: grainesError } = await supabase
      .from('graines')
      .insert({
        nom: 'Test Graine',
        variete: 'Test Variété',
        date_recolte: new Date().toISOString().split('T')[0],
        quantite: 1
      })
      .select();
    
    if (grainesError) {
      if (grainesError.code === '42P01') { // Relation n'existe pas
        console.log('La table graines n\'existe pas encore, création en cours...');
        
        // Créer la table via SQL
        const { error: createGrainesError } = await supabase
          .rpc('exec_sql', {
            sql: `
              CREATE TABLE IF NOT EXISTS graines (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                nom VARCHAR(255) NOT NULL,
                variete VARCHAR(255) NOT NULL,
                date_recolte DATE NOT NULL,
                date_limite_utilisation DATE,
                quantite INTEGER NOT NULL,
                photo_url TEXT,
                remarques TEXT,
                conditions_conservation TEXT,
                origine TEXT,
                rendement TEXT,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            `
          });
        
        if (createGrainesError) {
          console.error('Erreur lors de la création de la table graines:', createGrainesError);
        } else {
          console.log('Table graines créée avec succès');
        }
      } else {
        console.error('Erreur lors du test de la table graines:', grainesError);
      }
    } else {
      console.log('La table graines existe déjà');
    }
    
    // Essayer une approche alternative si les RPC ne fonctionnent pas
    console.log('Tentative de création des tables via l\'API REST...');
    
    // Créer la table bocaux via l'API REST
    const { error: restBocauxError } = await supabase
      .from('bocaux')
      .upsert([
        {
          id: '00000000-0000-0000-0000-000000000000',
          nom: 'Initialisation',
          date_fabrication: new Date().toISOString().split('T')[0],
          quantite: 0
        }
      ]);
    
    if (restBocauxError) {
      console.error('Erreur lors de la création de la table bocaux via REST:', restBocauxError);
    } else {
      console.log('Table bocaux créée ou mise à jour avec succès via REST');
    }
    
    // Créer la table graines via l'API REST
    const { error: restGrainesError } = await supabase
      .from('graines')
      .upsert([
        {
          id: '00000000-0000-0000-0000-000000000000',
          nom: 'Initialisation',
          variete: 'Initialisation',
          date_recolte: new Date().toISOString().split('T')[0],
          quantite: 0
        }
      ]);
    
    if (restGrainesError) {
      console.error('Erreur lors de la création de la table graines via REST:', restGrainesError);
    } else {
      console.log('Table graines créée ou mise à jour avec succès via REST');
    }
    
    console.log('Processus de création des tables terminé');
  } catch (error) {
    console.error('Erreur générale lors de la création des tables:', error);
  }
}

// Exécuter la fonction principale
main();
