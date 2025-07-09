import { useState, useEffect } from 'react';
import shorthandService from '../services/shorthandService';

export const useShorthand = (system) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [system]);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      // Load user profile for the selected system
      const mockProfile = {
        system,
        accuracy: system === 'TEELINE' ? 87 : system === 'GREGG' ? 92 : 0,
        samplesCount: system === 'TEELINE' ? 8 : system === 'GREGG' ? 12 : 0,
        status: system === 'PITMAN' ? 'TRAINING' : system === 'GREGG' ? 'EXPERT' : 'READY',
        totalDecoded: system === 'TEELINE' ? 156 : system === 'GREGG' ? 234 : 0,
        avgProcessingTime: system === 'TEELINE' ? 2.3 : system === 'GREGG' ? 1.8 : 0
      };
      setProfile(mockProfile);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const trainModel = async (samples) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await shorthandService.trainShorthandModel(system, samples);
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          accuracy: result.accuracy,
          samplesCount: samples.length,
          status: 'READY'
        }));
      } else {
        setError(result.error);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const decodeImage = async (imageData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await shorthandService.decodeShorthandImage(imageData, system, profile);
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const improveFromCorrection = async (originalText, correctedText) => {
    try {
      const result = await shorthandService.improveFromCorrection(originalText, correctedText, system);
      if (result.success) {
        // Update profile accuracy
        setProfile(prev => ({
          ...prev,
          accuracy: Math.min(prev.accuracy + 0.5, 100)
        }));
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const getAccuracyMetrics = async (timeRange) => {
    try {
      return await shorthandService.getAccuracyMetrics(system, timeRange);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return {
    profile,
    isLoading,
    error,
    trainModel,
    decodeImage,
    improveFromCorrection,
    getAccuracyMetrics,
    refreshProfile: loadProfile
  };
};

export default useShorthand;