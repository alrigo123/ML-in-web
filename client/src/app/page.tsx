"use client";

import { useState, useEffect } from 'react';
import { Cloud, Brain, TrendingUp, Zap, BarChart3, Activity, MapPin, ChevronRight, Map, LineChart, PieChart, BarChart } from 'lucide-react';

export default function Home() {
  const [currentModel, setCurrentModel] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const models = [
    { name: 'Random Forest', icon: '🌲', desc: 'Ensemble learning for robust predictions' },
    { name: 'LSTM', icon: '🧠', desc: 'Deep learning for temporal patterns' },
    { name: 'XGBoost', icon: '⚡', desc: 'Gradient boosting for high accuracy' },
    { name: 'ARIMA', icon: '📈', desc: 'Time series statistical modeling' },
    { name: 'Holt-Winters', icon: '🔄', desc: 'Exponential smoothing techniques' }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentModel((prev) => (prev + 1) % models.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Predictions',
      desc: 'Advanced machine learning models trained on historical weather data'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Time Series Analysis',
      desc: 'Sophisticated temporal pattern recognition for accurate forecasting'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Multiple Models',
      desc: 'Ensemble of 5 different algorithms for maximum reliability'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Processing',
      desc: 'Instant predictions with optimized performance'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className={`text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Location Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Andenes, Cusco - Peru</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Weather AI
          </h1>

          <h2 className="text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto">
            Advanced Machine Learning Models for Weather Time Series Prediction
          </h2>

          {/* Model Carousel */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-bounce">
                {models[currentModel].icon}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {models[currentModel].name}
              </h3>
              <p className="text-gray-300">
                {models[currentModel].desc}
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                {models.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentModel ? 'bg-blue-400 w-8' : 'bg-white/30'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-blue-500/25 inline-flex items-center space-x-2">
            <span>Explore Predictions</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform combines cutting-edge machine learning algorithms with meteorological expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-purple-500/10"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Data Visualization Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Location & Data Insights
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore Andenes, Cusco and visualize weather patterns through interactive charts
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <Map className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Location Overview</h3>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-white/10 min-h-[400px] flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-blue-400 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-xl font-semibold text-white">Andenes, Cusco</h4>
                <p className="text-gray-300">Peru • Elevation: 3,399m</p>
                <p className="text-sm text-gray-400">Interactive map will be integrated here</p>
              </div>

              {/* Location Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-sm">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-emerald-400">-13.5°</div>
                  <div className="text-xs text-gray-300">Latitude</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-emerald-400">-71.9°</div>
                  <div className="text-xs text-gray-300">Longitude</div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Plots Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <LineChart className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">Weather Data Visualization</h3>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-white/10 min-h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Temperature Trends</h4>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                </div>
              </div>

              {/* Simulated Chart Area */}
              <div className="relative h-64 bg-white/5 rounded-lg p-4 overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-around p-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                      style={{
                        height: `${Math.random() * 80 + 20}%`,
                        width: '6%',
                        opacity: 0.7
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
                    <p className="text-sm text-gray-400">Interactive charts will be integrated here</p>
                  </div>
                </div>
              </div>

              {/* Chart Controls */}
              <div className="flex justify-center space-x-2 mt-4">
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                  Temperature
                </button>
                <button className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition-colors">
                  Humidity
                </button>
                <button className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg text-sm hover:bg-white/20 transition-colors">
                  Precipitation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Analytics Dashboard */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Real-time Analytics
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Mini Chart 1 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Model Performance</h3>
              <PieChart className="w-5 h-5 text-green-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="h-32 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">94.2%</div>
                <div className="text-sm text-gray-300">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Mini Chart 2 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Prediction Trends</h3>
              <TrendingUp className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
              <div className="flex items-end space-x-1">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-blue-400 rounded-t"
                    style={{
                      height: `${Math.random() * 60 + 20}px`,
                      width: '8px'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mini Chart 3 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Data Volume</h3>
              <BarChart className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">1.2M</div>
                <div className="text-sm text-gray-300">Data Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our Model Arsenal
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 group cursor-pointer"
              onMouseEnter={() => setCurrentModel(index)}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {model.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{model.name}</h3>
              <p className="text-gray-300 text-sm">{model.desc}</p>
              <div className="mt-4 flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                <span>Learn more</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">5</div>
              <div className="text-gray-300">AI Models</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-300">Predictions</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-pink-400">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Visualization */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <Cloud className="w-12 h-12 text-blue-400 animate-pulse" />
            <div className="text-left">
              <div className="text-2xl font-bold text-white">Current Status</div>
              <div className="text-gray-300">Ready to predict weather patterns</div>
            </div>
            <Activity className="w-12 h-12 text-green-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}