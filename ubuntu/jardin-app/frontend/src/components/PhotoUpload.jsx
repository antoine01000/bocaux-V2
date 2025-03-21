import React, { useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../utils/supabaseClient';

const UploadContainer = styled.div`
  margin-bottom: 2rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: var(--primary-color);
    background-color: #f0f7f0;
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const UploadText = styled.p`
  margin-bottom: 1rem;
  color: #666;
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  margin-top: 1.5rem;
`;

const ImagePreview = styled.div`
  width: 100%;
  max-width: 300px;
  height: 200px;
  margin: 0 auto;
  background-color: #f0f0f0;
  background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 1rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: var(--primary-color);
  width: ${props => props.value}%;
  transition: width 0.3s;
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ffebee;
  border-radius: var(--border-radius);
`;

const SuccessMessage = styled.div`
  color: var(--success-color);
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e8f5e9;
  border-radius: var(--border-radius);
`;

const PhotoUpload = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Vérifier le type de fichier
    if (!selectedFile.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image (JPG, PNG, etc.)');
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
    
    // Simuler un upload immédiat
    handleUpload(selectedFile);
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
        setError('Veuillez sélectionner une image (JPG, PNG, etc.)');
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
      
      // Simuler un upload immédiat
      handleUpload(droppedFile);
    }
  };

  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) {
      return;
    }
    
    try {
      setUploading(true);
      setProgress(0);
      setError(null);
      setSuccess(false);
      
      // Générer un nom de fichier unique
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `bocaux/${fileName}`;
      
      // Simuler une progression d'upload
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);
      
      // Upload du fichier vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, fileToUpload, {
          cacheControl: '3600',
          upsert: false
        });
      
      clearInterval(progressInterval);
      
      if (error) {
        throw error;
      }
      
      // Obtenir l'URL publique de l'image
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      setProgress(100);
      setSuccess(true);
      
      // Appeler la fonction de callback avec l'URL de l'image
      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de l\'upload de l\'image:', error);
      setError('Une erreur est survenue lors de l\'upload de l\'image. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadContainer>
      <UploadArea
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <UploadIcon>📷</UploadIcon>
        <UploadText>
          {uploading 
            ? 'Upload en cours...' 
            : 'Cliquez ou glissez-déposez une image ici'}
        </UploadText>
        <HiddenInput
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {uploading && (
          <ProgressBar>
            <Progress value={progress} />
          </ProgressBar>
        )}
      </UploadArea>
      
      {previewUrl && (
        <PreviewContainer>
          <ImagePreview imageUrl={previewUrl}>
            {!previewUrl && 'Aperçu de l\'image'}
          </ImagePreview>
        </PreviewContainer>
      )}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>Image téléchargée avec succès!</SuccessMessage>}
    </UploadContainer>
  );
};

export default PhotoUpload;
