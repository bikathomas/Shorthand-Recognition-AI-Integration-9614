export const shorthandSystems = {
  TEELINE: {
    name: 'Teeline',
    description: 'Modern journalistic shorthand system',
    characteristics: ['Linear strokes', 'Simplified letters', 'Fast writing'],
    difficulty: 'Beginner',
    avgLearningTime: '2-3 months',
    usedBy: ['Journalists', 'Students', 'Secretaries']
  },
  PITMAN: {
    name: 'Pitman',
    description: 'Geometric shorthand with thickness variations',
    characteristics: ['Thick/thin lines', 'Positioning matters', 'Precise angles'],
    difficulty: 'Advanced',
    avgLearningTime: '6-12 months',
    usedBy: ['Court reporters', 'Professional stenographers']
  },
  GREGG: {
    name: 'Gregg',
    description: 'Cursive shorthand with flowing curves',
    characteristics: ['Curved lines', 'Size variations', 'Natural flow'],
    difficulty: 'Intermediate',
    avgLearningTime: '4-6 months',
    usedBy: ['Business professionals', 'Students', 'Note-takers']
  }
};

export const validateImageForShorthand = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a JPEG or PNG image'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB'
    };
  }

  return { valid: true };
};

export const preprocessImageForAI = (imageData) => {
  // In a real implementation, this would:
  // 1. Enhance contrast for better symbol recognition
  // 2. Remove noise and artifacts
  // 3. Normalize image size and orientation
  // 4. Apply system-specific preprocessing
  
  return imageData; // For now, return as-is
};

export const calculateReadingSpeed = (textLength, processingTime) => {
  // Calculate words per minute based on decoded text
  const wordCount = textLength.split(' ').length;
  const timeInMinutes = processingTime / (1000 * 60);
  return Math.round(wordCount / timeInMinutes);
};

export const generateShorthandTips = (system, accuracy) => {
  const baseTips = {
    TEELINE: [
      'Keep your strokes consistent and flowing',
      'Practice common word outlines daily',
      'Focus on maintaining proper letter proportions'
    ],
    PITMAN: [
      'Pay attention to line thickness variations',
      'Practice precise positioning on the line',
      'Master the angle differences between similar sounds'
    ],
    GREGG: [
      'Maintain smooth, curved strokes',
      'Practice size variations for different sounds',
      'Focus on natural writing flow'
    ]
  };

  let tips = [...baseTips[system]];

  if (accuracy < 70) {
    tips.push('Consider adding more training samples');
    tips.push('Practice basic symbol recognition');
  } else if (accuracy < 85) {
    tips.push('Work on connecting strokes smoothly');
    tips.push('Practice common word combinations');
  } else {
    tips.push('Focus on speed improvement');
    tips.push('Practice complex technical vocabulary');
  }

  return tips;
};

export const formatConfidenceScore = (confidence) => {
  if (confidence >= 90) return { label: 'Excellent', color: 'green' };
  if (confidence >= 80) return { label: 'Good', color: 'blue' };
  if (confidence >= 70) return { label: 'Fair', color: 'yellow' };
  return { label: 'Poor', color: 'red' };
};

export const estimateTrainingProgress = (samplesCount, targetAccuracy = 90) => {
  const baseAccuracy = 60;
  const accuracyPerSample = 5;
  const currentAccuracy = Math.min(baseAccuracy + (samplesCount * accuracyPerSample), 95);
  const samplesNeeded = Math.max(0, Math.ceil((targetAccuracy - currentAccuracy) / accuracyPerSample));
  
  return {
    currentAccuracy,
    samplesNeeded,
    progress: Math.min((currentAccuracy / targetAccuracy) * 100, 100)
  };
};

export const exportShorthandData = (profile, decodingHistory) => {
  const exportData = {
    profile,
    decodingHistory,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `shorthand_${profile.system}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importShorthandData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid file format'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};