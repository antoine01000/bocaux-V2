import { createClient } from '@supabase/supabase-js';

// Configuration de Supabase
const supabaseUrl = 'https://iunfihikvlarustuhamo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bmZpaGlrdmxhcnVzdHVoYW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTUyMTksImV4cCI6MjA1NDY5MTIxOX0.NgFr1RMhT4eoOJgps73LFOHUexZ6vFCtejcBBqylRXI';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour activer l'extension uuid-ossp
async function enableUuidExtension() {
  const { error } = await supabase.rpc('extensions', {
    query: 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
  });
  
  if (error) {
    console.error('Erreur lors de l\'activation de l\'extension uuid-ossp:', error);
    return false;
  }
  
  console.log('Extension uuid-ossp activée avec succès');
  return true;
}

// Fonction pour créer la table des bocaux
async function createBocauxTable() {
  const { error } = await supabase.rpc('create_table', {
    query: `
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
  
  if (error) {
    console.error('Erreur lors de la création de la table bocaux:', error);
    return false;
  }
  
  console.log('Table bocaux créée avec succès');
  return true;
}

// Fonction pour créer la table des graines
async function createGrainesTable() {
  const { error } = await supabase.rpc('create_table', {
    query: `
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
  
  if (error) {
    console.error('Erreur lors de la création de la table graines:', error);
    return false;
  }
  
  console.log('Table graines créée avec succès');
  return true;
}

// Fonction pour créer la fonction de mise à jour du timestamp
async function createUpdateTimestampFunction() {
  const { error } = await supabase.rpc('create_function', {
    query: `
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `
  });
  
  if (error) {
    console.error('Erreur lors de la création de la fonction update_updated_at_column:', error);
    return false;
  }
  
  console.log('Fonction update_updated_at_column créée avec succès');
  return true;
}

// Fonction pour créer les triggers
async function createTriggers() {
  // Trigger pour la table bocaux
  const { error: errorBocaux } = await supabase.rpc('create_trigger', {
    query: `
      CREATE TRIGGER update_bocaux_updated_at
      BEFORE UPDATE ON bocaux
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `
  });
  
  if (errorBocaux) {
    console.error('Erreur lors de la création du trigger pour la table bocaux:', errorBocaux);
    return false;
  }
  
  // Trigger pour la table graines
  const { error: errorGraines } = await supabase.rpc('create_trigger', {
    query: `
      CREATE TRIGGER update_graines_updated_at
      BEFORE UPDATE ON graines
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `
  });
  
  if (errorGraines) {
    console.error('Erreur lors de la création du trigger pour la table graines:', errorGraines);
    return false;
  }
  
  console.log('Triggers créés avec succès');
  return true;
}

// Fonction principale pour exécuter toutes les opérations
async function main() {
  try {
    console.log('Début de la création des tables dans Supabase...');
    
    // Activer l'extension uuid-ossp
    await enableUuidExtension();
    
    // Créer les tables
    await createBocauxTable();
    await createGrainesTable();
    
    // Créer la fonction de mise à jour du timestamp
    await createUpdateTimestampFunction();
    
    // Créer les triggers
    await createTriggers();
    
    console.log('Création des tables terminée avec succès!');
  } catch (error) {
    console.error('Erreur lors de la création des tables:', error);
  }
}

// Exécuter la fonction principale
main();
