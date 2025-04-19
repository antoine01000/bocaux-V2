import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';

const UploadContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const UploadLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const UploadBox = styled.div`
  border: 2px dashed #ddd;
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadText = styled.p`
  margin-bottom: 1rem;
  color: #666;
`;

const UploadButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  border: none;
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

const PreviewContainer = styled.div`
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: #388e3c;
  background-color: #e8f5e9;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-top: 1rem;
`;

const PhotoUpload = ({ onPhotoUploaded, initialPhotoUrl = null }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialPhotoUrl);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Vérifier le type de fichier
      if (!selectedFile.type.startsWith('image/')) {
        setError('Veuillez sélectionner un fichier image (JPG, PNG, etc.)');
        return;
      }
      
      // Vérifier la taille du fichier (max 5 MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('L\'image est trop volumineuse. Taille maximale: 5 MB');
        return;
      }
      
      setFile(selectedFile);
      setError(null);
      
      // Créer une URL pour la prévisualisation
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      
      // Nettoyer l'URL de prévisualisation lorsque le composant est démonté
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Vérifier le type de fichier
      if (!droppedFile.type.startsWith('image/')) {
        setError('Veuillez sélectionner un fichier image (JPG, PNG, etc.)');
        return;
      }
      
      // Vérifier la taille du fichier (max 5 MB)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('L\'image est trop volumineuse. Taille maximale: 5 MB');
        return;
      }
      
      setFile(droppedFile);
      setError(null);
      
      // Créer une URL pour la prévisualisation
      const objectUrl = URL.createObjectURL(droppedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const uploadPhoto = async () => {
    if (!file) {
      setError('Veuillez sélectionner une image à télécharger');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `photos/${fileName}`;
      
      // Télécharger le fichier vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      // Obtenir l'URL publique du fichier téléchargé
      const { data } = supabase.storage
        .from('categories')
        .getPublicUrl(filePath);
        
      const photoUrl = data.publicUrl;
      
      // Notifier le composant parent que la photo a été téléchargée
      onPhotoUploaded(photoUrl);
      
      setSuccess('Photo téléchargée avec succès!');
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors du téléchargement de la photo:', error);
      setError('Une erreur est survenue lors du téléchargement de la photo. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadContainer>
      <UploadLabel>Photo</UploadLabel>
      <UploadBox 
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadInput 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          ref={fileInputRef}
        />
        <UploadText>
          Glissez-déposez une image ici ou cliquez pour sélectionner un fichier
        </UploadText>
        <UploadButton type="button" disabled={uploading}>
          Sélectionner une image
        </UploadButton>
      </UploadBox>
      
      {previewUrl && (
        <PreviewContainer>
          <ImagePreview imageUrl={previewUrl}>
            {!previewUrl && 'Aucune image'}
          </ImagePreview>
          <UploadButton 
            type="button" 
            onClick={uploadPhoto} 
            disabled={uploading || !file}
          >
            {uploading ? 'Téléchargement en cours...' : 'Télécharger l\'image'}
          </UploadButton>
        </PreviewContainer>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </UploadContainer>
  );
};

export default PhotoUpload;
