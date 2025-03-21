-- Activation de l'extension pour générer des UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Création de la table pour les bocaux
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

-- Création de la table pour les graines
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

-- Création d'une fonction pour mettre à jour le timestamp "updated_at"
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création des triggers pour mettre à jour automatiquement "updated_at"
CREATE TRIGGER update_bocaux_updated_at
BEFORE UPDATE ON bocaux
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_graines_updated_at
BEFORE UPDATE ON graines
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
