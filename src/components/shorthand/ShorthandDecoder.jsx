import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiZap, FiEdit3, FiCheck, FiX, FiEye, FiRefreshCw, FiTrendingUp } = FiIcons;

const ShorthandDecoder = ({ system, profile }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedText, setDecodedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [recognizedPatterns, setRecognizedPatterns] = useState([]);
  const [processingTime, setProcessingTime] = useState(0);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentImage(e.target.result);
        setDecodedText('');
        setConfidence(0);
        setRecognizedPatterns([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeShorthand = async () => {
    if (!currentImage) return;

    setIsDecoding(true);
    const startTime = Date.now();

    // Simulate AI decoding process
    const mockPatterns = [
      { symbol: '⌒', confidence: 0.95, meaning: 'the' },
      { symbol: '∩', confidence: 0.88, meaning: 'and' },
      { symbol: '⌐', confidence: 0.92, meaning: 'ing' },
      { symbol: '∼', confidence: 0.85, meaning: 'er' },
    ];

    const mockText = "The quick brown fox jumps over the lazy dog. This is a sample shorthand decoding that demonstrates the AI's ability to recognize and interpret shorthand symbols.";

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const endTime = Date.now();
    setProcessingTime(endTime - startTime);
    setDecodedText(mockText);
    setConfidence(89);
    setRecognizedPatterns(mockPatterns);
    setIsDecoding(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedText(decodedText);
  };

  const saveEdits = () => {
    setDecodedText(editedText);
    setIsEditing(false);
    // Here you would send the correction back to improve the AI model
  };

  const cancelEdits = () => {
    setIsEditing(false);
    setEditedText('');
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 90) return 'Excellent';
    if (confidence >= 70) return 'Good';
    return 'Needs Review';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {system} Shorthand Decoder
        </h2>
        <p className="text-gray-600">
          Upload your shorthand and let AI decode it instantly
        </p>
        {profile && (
          <div className="mt-4 flex justify-center space-x-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              Accuracy: {profile.accuracy}%
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {profile.samplesCount} samples trained
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {currentImage ? (
              <div className="space-y-4">
                <img
                  src={currentImage}
                  alt="Shorthand to decode"
                  className="max-w-full h-64 object-contain mx-auto rounded-lg"
                />
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={decodeShorthand}
                    disabled={isDecoding}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    <SafeIcon icon={isDecoding ? FiRefreshCw : FiZap} className={`w-5 h-5 ${isDecoding ? 'animate-spin' : ''}`} />
                    <span>{isDecoding ? 'Decoding...' : 'Decode Shorthand'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <SafeIcon icon={FiUpload} className="w-16 h-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Upload shorthand image
                  </p>
                  <p className="text-gray-500">
                    Clear image of your {system.toLowerCase()} shorthand
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

          {/* Recognized Patterns */}
          {recognizedPatterns.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <SafeIcon icon={FiEye} className="w-5 h-5 mr-2" />
                Recognized Patterns
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {recognizedPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-mono">{pattern.symbol}</span>
                      <span className="text-gray-700">{pattern.meaning}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getConfidenceColor(pattern.confidence * 100)}`}>
                      {Math.round(pattern.confidence * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Decoded Text Section */}
        <div className="space-y-6">
          {decodedText && (
            <>
              {/* Confidence Indicator */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(confidence)}`}>
                    {confidence}% - {getConfidenceLabel(confidence)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      confidence >= 90 ? 'bg-green-500' : 
                      confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Processing time: {processingTime}ms</span>
                  <span>Words: {decodedText.split(' ').length}</span>
                </div>
              </div>

              {/* Decoded Text */}
              <div className="bg-white border rounded-lg">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">Decoded Text</h3>
                  <div className="flex space-x-2">
                    {!isEditing && (
                      <button
                        onClick={startEditing}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    )}
                    {isEditing && (
                      <>
                        <button
                          onClick={saveEdits}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiCheck} className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={cancelEdits}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  {isEditing ? (
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Edit the decoded text..."
                    />
                  ) : (
                    <div className="min-h-64 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {decodedText}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-2" />
                  Improvement Tips
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your shorthand clarity is excellent for symbols like "the" and "and"</li>
                  <li>• Consider more consistent spacing between words</li>
                  <li>• The AI is still learning your style - corrections help improve accuracy</li>
                </ul>
              </div>
            </>
          )}

          {!decodedText && !isDecoding && (
            <div className="text-center text-gray-500 py-16">
              <SafeIcon icon={FiZap} className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Upload an image to start decoding</p>
              <p className="text-sm">Your AI model is ready to decode {system} shorthand</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShorthandDecoder;