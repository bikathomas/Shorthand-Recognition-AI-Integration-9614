import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ShorthandTraining from './ShorthandTraining';
import ShorthandDecoder from './ShorthandDecoder';

const { FiZap, FiTrendingUp, FiBook, FiSettings, FiUser, FiTarget, FiClock, FiCheckCircle } = FiIcons;

const ShorthandDashboard = () => {
  const [activeTab, setActiveTab] = useState('decoder');
  const [selectedSystem, setSelectedSystem] = useState('TEELINE');
  const [userProfiles, setUserProfiles] = useState({
    TEELINE: {
      accuracy: 87,
      samplesCount: 8,
      status: 'READY',
      totalDecoded: 156,
      avgProcessingTime: 2.3
    },
    PITMAN: {
      accuracy: 0,
      samplesCount: 0,
      status: 'TRAINING',
      totalDecoded: 0,
      avgProcessingTime: 0
    },
    GREGG: {
      accuracy: 92,
      samplesCount: 12,
      status: 'EXPERT',
      totalDecoded: 234,
      avgProcessingTime: 1.8
    }
  });

  const shorthandSystems = {
    TEELINE: {
      name: 'Teeline',
      description: 'Modern journalistic shorthand',
      color: 'blue'
    },
    PITMAN: {
      name: 'Pitman',
      description: 'Geometric shorthand system',
      color: 'green'
    },
    GREGG: {
      name: 'Gregg',
      description: 'Cursive shorthand system',
      color: 'purple'
    }
  };

  const tabs = [
    { id: 'decoder', label: 'Decoder', icon: FiZap },
    { id: 'training', label: 'Training', icon: FiBook },
    { id: 'analytics', label: 'Analytics', icon: FiTrendingUp },
    { id: 'settings', label: 'Settings', icon: FiSettings }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'EXPERT': return 'bg-green-100 text-green-800';
      case 'READY': return 'bg-blue-100 text-blue-800';
      case 'TRAINING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'EXPERT': return FiCheckCircle;
      case 'READY': return FiTarget;
      case 'TRAINING': return FiClock;
      default: return FiUser;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shorthand Studio</h1>
              <p className="text-gray-600">AI-powered shorthand recognition and training</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(shorthandSystems).map(([key, system]) => (
                  <option key={key} value={key}>{system.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(shorthandSystems).map(([key, system]) => {
            const profile = userProfiles[key];
            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                  key === selectedSystem ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{system.name}</h3>
                    <p className="text-sm text-gray-600">{system.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.status)}`}>
                    <SafeIcon icon={getStatusIcon(profile.status)} className="w-3 h-3 inline mr-1" />
                    {profile.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Accuracy</p>
                    <p className="text-xl font-bold text-gray-800">{profile.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Samples</p>
                    <p className="text-xl font-bold text-gray-800">{profile.samplesCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Decoded</p>
                    <p className="text-xl font-bold text-gray-800">{profile.totalDecoded}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Avg Speed</p>
                    <p className="text-xl font-bold text-gray-800">{profile.avgProcessingTime}s</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'decoder' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ShorthandDecoder 
                system={shorthandSystems[selectedSystem].name}
                profile={userProfiles[selectedSystem]}
              />
            </motion.div>
          )}

          {activeTab === 'training' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ShorthandTraining 
                system={selectedSystem}
                onComplete={() => {
                  setUserProfiles(prev => ({
                    ...prev,
                    [selectedSystem]: {
                      ...prev[selectedSystem],
                      status: 'READY',
                      accuracy: 85,
                      samplesCount: prev[selectedSystem].samplesCount + 1
                    }
                  }));
                }}
              />
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Performance Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {userProfiles[selectedSystem].accuracy}%
                  </div>
                  <div className="text-gray-600">Current Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {userProfiles[selectedSystem].totalDecoded}
                  </div>
                  <div className="text-gray-600">Pages Decoded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {userProfiles[selectedSystem].avgProcessingTime}s
                  </div>
                  <div className="text-gray-600">Avg Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {userProfiles[selectedSystem].samplesCount}
                  </div>
                  <div className="text-gray-600">Training Samples</div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shorthand Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Shorthand System
                  </label>
                  <select
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(shorthandSystems).map(([key, system]) => (
                      <option key={key} value={key}>{system.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Quality
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="standard">Standard (Faster)</option>
                    <option value="high">High Quality (Slower)</option>
                    <option value="maximum">Maximum Accuracy</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoCorrect"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoCorrect" className="ml-2 block text-sm text-gray-700">
                    Enable auto-correction suggestions
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="continuousLearning"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="continuousLearning" className="ml-2 block text-sm text-gray-700">
                    Continuous learning from corrections
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ShorthandDashboard;