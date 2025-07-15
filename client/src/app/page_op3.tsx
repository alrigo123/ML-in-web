"use client";
// It uses modern React practices with functional components and hooks.

import React from 'react';

// The main Home component for the landing page content.
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-[Inter]">
      {/* Content wrapper, centered and with a max-width for readability. */}
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl max-w-4xl w-full text-center">
        {/* Hero Section: Main title and subtitle */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
          Unlocking Weather Insights for <span className="text-indigo-600">Andenes, Cusco-Peru</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Leveraging cutting-edge AI and statistical models to provide highly accurate weather time series predictions.
        </p>

        {/* Features/Models Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Description of the app's core functionality */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Precision Weather Forecasting</h3>
            <p className="text-gray-600">
              Our application specializes in analyzing complex weather patterns and historical data from the unique Andean region of Cusco, Peru, offering unparalleled accuracy in time series predictions.
            </p>
          </div>

          {/* Models used section */}
          <div className="bg-purple-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
            <svg className="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Powered by Advanced Models</h3>
            <p className="text-gray-600 mb-4">
              We integrate a diverse suite of powerful machine learning and statistical algorithms to ensure robust and reliable predictions:
            </p>
            <ul className="list-disc list-inside text-gray-700 text-left mx-auto">
              <li className="mb-1">Random Forest</li>
              <li className="mb-1">Long Short-Term Memory (LSTM)</li>
              <li className="mb-1">XGBoost</li>
              <li className="mb-1">(S)ARIMA (Seasonal Autoregressive Integrated Moving Average)</li>
              <li>Holt-Winters Exponential Smoothing</li>
            </ul>
          </div>
        </div>

        {/* Location/Map Section */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Explore Our Location</h2>
          <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[300px]">
            <svg className="w-16 h-16 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <p className="text-gray-600 text-lg">
              A dynamic map showcasing the Andenes region in Cusco, Peru, will be integrated here, providing visual context for our predictions.
            </p>
            {/* Placeholder for an actual map component (e.g., Google Maps embed) */}
            <div className="w-full h-64 bg-gray-200 rounded-md mt-4 flex items-center justify-center text-gray-500">
              [Map Placeholder]
            </div>
          </div>
        </div>

        {/* Data Plots Section */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Visualizing Our Data</h2>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[300px]">
            <svg className="w-16 h-16 text-yellow-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z"></path>
            </svg>
            <p className="text-gray-600 text-lg">
              Interactive plots and charts will be displayed here, illustrating historical weather data, model performance, and future predictions.
            </p>
            {/* Placeholder for actual data plots (e.g., using a charting library) */}
            <div className="w-full h-64 bg-gray-200 rounded-md mt-4 flex items-center justify-center text-gray-500">
              [Data Plots Placeholder]
            </div>
          </div>
        </div>

        {/* Call to Action (Optional, but good for a landing page) */}
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
          Learn More About Our Predictions
        </button>
      </div>
    </div>
  );
}







