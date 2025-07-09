import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiType, FiCheck, FiX, FiZap, FiTrendingUp, FiEye } = FiIcons;

const ShorthandTraining = ({ system, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [samples, setSamples] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [currentSample, setCurrentSample] = useState({
    image: null,
    transcription: '',
    preview: null
  });
  const fileInputRef = useRef(null);

  const steps = [
    { title: 'Upload Shorthand', icon: FiUpload },
    { title: 'Add Transcription', icon: FiType },
    { title: 'Verify & Train', icon: FiCheck }
  ];

  const shorthandSystems = {
    TEELINE: {
      name: 'Teeline',
      description: 'Modern journalistic shorthand system',
      characteristics: ['Linear strokes', 'Simplified letters', 'Fast writing']
    },
    PITMAN: {
      name: 'Pitman',
      description: 'Geometric shorthand with thickness variations',
      characteristics: ['Thick/thin lines', 'Positioning matters', 'Precise angles']
    },
    GREGG: {
      name: 'Gregg',
      description: 'Cursive shorthand with flowing curves',
      characteristics: ['Curved lines', 'Size variations', 'Natural flow']
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentSample({
          ...currentSample,
          image: file,
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTranscriptionChange = (e) => {
    setCurrentSample({
      ...currentSample,
      transcription: e.target.value
    });
  };

  const addSample = () => {
    if (currentSample.image && currentSample.transcription) {
      setSamples([...samples, { ...currentSample, id: Date.now() }]);
      setCurrentSample({ image: null, transcription: '', preview: null });
      setCurrentStep(0);
    }
  };

  const removeSample = (id) => {
    setSamples(samples.filter(sample => sample.id !== id));
  };

  const trainModel = async () => {
    setIsProcessing(true);
    // Simulate AI training process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setAccuracy(i);
    }
    setIsProcessing(false);
    if (onComplete) onComplete();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {shorthandSystems[system].name} Training
        </h2>
        <p className="text-gray-600 mb-4">
          {shorthandSystems[system].description}
        </p>
        <div className="flex justify-center space-x-4">
          {shorthandSystems[system].characteristics.map((char, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                <SafeIcon icon={step.icon} className="w-5 h-5" />
              </div>
              <span className={`ml-2 font-medium ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Training Steps */}
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {currentSample.preview ? (
                <div className="space-y-4">
                  <img
                    src={currentSample.preview}
                    alt="Shorthand sample"
                    className="max-w-full h-64 object-contain mx-auto rounded-lg"
                  />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <SafeIcon icon={FiUpload} className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Upload your shorthand sample
                    </p>
                    <p className="text-gray-500">
                      Clear image of your {shorthandSystems[system].name.toLowerCase()} writing
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Choose Image
                  </button>
                </div>
              )}
            </div>
            {currentSample.preview && (
              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Next Step
                </button>
              </div>
            )}
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Shorthand Image
                </h3>
                <img
                  src={currentSample.preview}
                  alt="Shorthand sample"
                  className="w-full h-64 object-contain border rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Transcription
                </h3>
                <textarea
                  value={currentSample.transcription}
                  onChange={handleTranscriptionChange}
                  placeholder="Type the exact text that your shorthand represents..."
                  className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={!currentSample.transcription.trim()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <img
                  src={currentSample.preview}
                  alt="Shorthand sample"
                  className="w-full h-32 object-contain mb-2"
                />
                <p className="text-sm text-gray-600 truncate">
                  {currentSample.transcription}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={addSample}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add Sample
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Training Samples */}
      {samples.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Training Samples ({samples.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {samples.map((sample) => (
              <div key={sample.id} className="border rounded-lg p-4 relative">
                <button
                  onClick={() => removeSample(sample.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
                <img
                  src={sample.preview}
                  alt="Sample"
                  className="w-full h-24 object-contain mb-2"
                />
                <p className="text-sm text-gray-600 truncate">
                  {sample.transcription}
                </p>
              </div>
            ))}
          </div>

          {/* Training Controls */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  Ready to Train AI Model
                </h4>
                <p className="text-gray-600">
                  {samples.length} samples ready for training
                </p>
              </div>
              <button
                onClick={trainModel}
                disabled={isProcessing || samples.length < 3}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <SafeIcon icon={FiZap} className="w-5 h-5" />
                <span>{isProcessing ? 'Training...' : 'Train Model'}</span>
              </button>
            </div>

            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Training Progress</span>
                  <span>{accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            )}

            {samples.length < 3 && (
              <div className="text-center text-gray-500 mt-4">
                <p>Add at least 3 samples to start training</p>
                <p className="text-sm">Recommended: 5-10 samples for best results</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShorthandTraining;