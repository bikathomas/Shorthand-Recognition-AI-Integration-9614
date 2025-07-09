import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSearch, FiBook, FiZap, FiTrendingUp, FiEye } = FiIcons;

const ShorthandPatternLibrary = ({ system }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const patterns = {
    TEELINE: [
      { symbol: '⌒', meaning: 'the', category: 'common', confidence: 0.95 },
      { symbol: '∩', meaning: 'and', category: 'common', confidence: 0.92 },
      { symbol: '⌐', meaning: 'ing', category: 'endings', confidence: 0.88 },
      { symbol: '∼', meaning: 'er', category: 'endings', confidence: 0.85 },
      { symbol: '⊂', meaning: 'for', category: 'common', confidence: 0.90 },
      { symbol: '⊃', meaning: 'to', category: 'common', confidence: 0.93 },
      { symbol: '∪', meaning: 'with', category: 'common', confidence: 0.87 },
      { symbol: '∩', meaning: 'that', category: 'common', confidence: 0.89 },
    ],
    PITMAN: [
      { symbol: '|', meaning: 't', category: 'letters', confidence: 0.96 },
      { symbol: '/', meaning: 'p', category: 'letters', confidence: 0.94 },
      { symbol: '\\', meaning: 'b', category: 'letters', confidence: 0.91 },
      { symbol: '—', meaning: 'k', category: 'letters', confidence: 0.93 },
      { symbol: '~', meaning: 'g', category: 'letters', confidence: 0.88 },
      { symbol: '∠', meaning: 'ch', category: 'blends', confidence: 0.86 },
      { symbol: '∟', meaning: 'sh', category: 'blends', confidence: 0.84 },
    ],
    GREGG: [
      { symbol: '⌒', meaning: 'a', category: 'vowels', confidence: 0.92 },
      { symbol: '∩', meaning: 'e', category: 'vowels', confidence: 0.94 },
      { symbol: '⊂', meaning: 'i', category: 'vowels', confidence: 0.89 },
      { symbol: '⊃', meaning: 'o', category: 'vowels', confidence: 0.91 },
      { symbol: '∪', meaning: 'u', category: 'vowels', confidence: 0.87 },
      { symbol: '∼', meaning: 'th', category: 'blends', confidence: 0.85 },
      { symbol: '≈', meaning: 'wh', category: 'blends', confidence: 0.83 },
    ]
  };

  const categories = {
    all: 'All Patterns',
    common: 'Common Words',
    letters: 'Letters',
    vowels: 'Vowels',
    blends: 'Blends',
    endings: 'Endings'
  };

  const systemPatterns = patterns[system] || [];
  const filteredPatterns = systemPatterns.filter(pattern => {
    const matchesSearch = pattern.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pattern.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'bg-green-100 text-green-800';
    if (confidence >= 0.8) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {system} Pattern Library
        </h2>
        <p className="text-gray-600">
          Explore learned patterns and their recognition confidence
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {Object.entries(categories).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Pattern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPatterns.map((pattern, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-center mb-4">
              <div className="text-6xl font-mono text-gray-800 mb-2">
                {pattern.symbol}
              </div>
              <div className="text-xl font-semibold text-gray-700">
                {pattern.meaning}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Category</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {categories[pattern.category]}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Confidence</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(pattern.confidence)}`}>
                  {Math.round(pattern.confidence * 100)}%
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    pattern.confidence >= 0.9 ? 'bg-green-500' : 
                    pattern.confidence >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${pattern.confidence * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPatterns.length === 0 && (
        <div className="text-center py-12">
          <SafeIcon icon={FiEye} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg text-gray-500">No patterns found</p>
          <p className="text-sm text-gray-400">Try adjusting your search or category filter</p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <SafeIcon icon={FiTrendingUp} className="w-5 h-5 mr-2" />
          Pattern Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {systemPatterns.length}
            </div>
            <div className="text-sm text-gray-600">Total Patterns</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(systemPatterns.reduce((acc, p) => acc + p.confidence, 0) / systemPatterns.length * 100)}%
            </div>
            <div className="text-sm text-gray-600">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {systemPatterns.filter(p => p.confidence >= 0.9).length}
            </div>
            <div className="text-sm text-gray-600">High Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {new Set(systemPatterns.map(p => p.category)).size}
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShorthandPatternLibrary;