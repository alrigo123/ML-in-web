// 'use client'
// // This is a client component, as indicated by "use client";
// import React, { useState } from "react";
// import axios from "axios";

// // Define the structure for the prediction data.
// interface PredictionData {
//   dates: string[];
//   predictions: number[];
// }

// const Prediction: React.FC = () => {
//   // State for the number of days to predict.
//   const [n, setN] = useState<number>(1);
//   // State for the target weather variable.
//   const [variable, setVariable] = useState<string>("Temp_max");
//   // State for the selected prediction model.
//   const [modelType, setModelType] = useState<string>("RandomForest"); // Default model
//   // State to store the prediction results.
//   const [prediction, setPrediction] = useState<PredictionData | null>(null);
//   // State for loading indicator.
//   const [loading, setLoading] = useState<boolean>(false);
//   // State for error messages.
//   const [error, setError] = useState<string | null>(null);

//   // Function to handle form submission and trigger prediction.
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent default form submission behavior.
//     setLoading(true); // Show loading spinner.
//     setError(null); // Clear any previous errors.
//     setPrediction(null); // Clear previous predictions.

//     try {
//       // Construct the API URL dynamically based on the selected model.
//       // IMPORTANT: For Canvas preview, the API URL is hardcoded.
//       // In your Next.js project, you should use:
//       // `${process.env.NEXT_PUBLIC_API_URL}/predict/${modelType.toLowerCase()}`
//       const apiUrl = `http://localhost:7000/predict/${modelType.toLowerCase()}`;

//       // Changed from axios.post to axios.get and passed parameters as query params.
//       const { data } = await axios.get(apiUrl, {
//         params: {
//           n: n,
//           variable: variable,
//         },
//       });

//       // Assuming the API returns data in the format { dates: [], predictions: [] }
//       setPrediction(data);
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         // Extract error message from API response or use a generic one.
//         setError(err.response?.data?.message || "Error al obtener la predicción. Inténtalo de nuevo.");
//       } else {
//         setError("Ocurrió un error inesperado.");
//       }
//       console.error("Prediction error:", err);
//     } finally {
//       setLoading(false); // Hide loading spinner.
//     }
//   };

//   // Function to reset the prediction and show the input form again.
//   const resetPrediction = () => {
//     setPrediction(null);
//     setError(null);
//     setN(1);
//     setVariable("Temp_max");
//     setModelType("RandomForest");
//   };

//   return (
//     // Main container for the prediction page, providing a consistent background and centering.
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-800 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-[Inter]">
//       {/* Prediction card container.
//                 Uses Tailwind for background, text color, padding, rounded corners, and shadow. */}
//       <div className="bg-gray-800 text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl max-w-3xl w-full">
//         {/* Main heading for the prediction section. */}
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-6 text-center">
//           Predicción Meteorológica
//         </h1>

//         {/* Conditional rendering based on whether a prediction has been made. */}
//         {!prediction && (
//           <>
//             <p className="text-lg text-gray-300 mb-8 text-center">
//               Ingresa el número de días, selecciona la variable y el modelo para ver la predicción.
//             </p>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Model Selection */}
//               <div className="relative mb-4">
//                 <label htmlFor="modelType" className="block text-sm font-medium text-gray-300 mb-1">
//                   Modelo de Predicción:
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="modelType"
//                     value={modelType}
//                     onChange={(e) => setModelType(e.target.value)}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none pr-10"
//                   >
//                     <option value="Random_Forest">Random Forest</option>
//                     <option value="LSTM">LSTM</option>
//                     <option value="XGBoost">XGBoost</option>
//                     <option value="SARIMA">(S)ARIMA</option>
//                     <option value="HoltWinters">Holt-Winters Exponential Smoothing</option>
//                   </select>
//                   {/* Dropdown arrow icon (inline SVG) */}
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Number of Days Input */}
//               <div className="mb-4">
//                 <label htmlFor="n" className="block text-sm font-medium text-gray-300 mb-1">
//                   Número de días:
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="n"
//                     type="number"
//                     value={n}
//                     onChange={(e) => setN(Number(e.target.value))}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10"
//                     min="1" // Ensure at least 1 day is selected
//                     required
//                   />
//                   {/* Calendar icon (inline SVG) */}
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar">
//                       <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//                       <line x1="16" y1="2" x2="16" y2="6"></line>
//                       <line x1="8" y1="2" x2="8" y2="6"></line>
//                       <line x1="3" y1="10" x2="21" y2="10"></line>
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Variable Selection */}
//               <div className="mb-6">
//                 <label htmlFor="variable" className="block text-sm font-medium text-gray-300 mb-1">
//                   Variable objetivo:
//                 </label>
//                 <div className="relative">
//                   <select
//                     id="variable"
//                     value={variable}
//                     onChange={(e) => setVariable(e.target.value)}
//                     className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none pr-10"
//                   >
//                     <option value="Temp_max">Temperatura Máxima</option>
//                     <option value="Temp_min">Temperatura Mínima</option>
//                     <option value="Humedad">Humedad</option>
//                     <option value="Precipitacion">Precipitación</option>
//                   </select>
//                   {/* Dropdown arrow icon (inline SVG) */}
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
//                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     {/* Simple spinner animation using Tailwind classes. */}
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Generando Predicción...
//                   </span>
//                 ) : (
//                   "Mostrar Predicción"
//                 )}
//               </button>
//             </form>
//           </>
//         )}

//         {/* Loading and Error Messages */}
//         {loading && (
//           <p className="mt-8 text-center text-indigo-300 flex items-center justify-center">
//             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Cargando...
//           </p>
//         )}
//         {error && (
//           <div className="mt-8 p-4 bg-red-600 text-white rounded-lg text-center shadow-md">
//             <p className="font-semibold mb-2">Error:</p>
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Prediction Results Display */}
//         {prediction && (
//           <div className="mt-8">
//             <h2 className="text-2xl sm:text-3xl font-bold text-indigo-300 mb-6 text-center">
//               Predicción de {variable} para {n} {n === 1 ? "día" : "días"}
//             </h2>

//             {/* Placeholder for Data Visualization (e.g., a Chart) */}
//             <div className="bg-gray-700 p-6 rounded-lg shadow-inner mb-8 min-h-[250px] flex items-center justify-center text-gray-400 text-center">
//               [Aquí se mostrará un gráfico interactivo de la predicción.]
//               {/* You can integrate a charting library like Recharts, Chart.js, or D3.js here. */}
//             </div>

//             {/* Prediction Table */}
//             <div className="overflow-x-auto rounded-lg shadow-lg">
//               <table className="min-w-full bg-gray-700 text-left border-collapse">
//                 <thead>
//                   <tr>
//                     <th className="py-3 px-4 bg-gray-600 text-gray-200 uppercase tracking-wider rounded-tl-lg">Fecha</th>
//                     <th className="py-3 px-4 bg-gray-600 text-gray-200 uppercase tracking-wider rounded-tr-lg">Predicción</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {prediction.dates.map((date, index) => (
//                     <tr key={index} className="border-t border-gray-600 hover:bg-gray-600 transition-colors duration-200">
//                       <td className="py-3 px-4 text-gray-300">{date}</td>
//                       <td className="py-3 px-4 text-gray-300">{prediction.predictions[index].toFixed(2)}</td> {/* Format to 2 decimal places */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Back Button */}
//             <div className="flex justify-center mt-8">
//               <button
//                 onClick={resetPrediction}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
//               >
//                 Realizar Nueva Predicción
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Prediction;




"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  ArrowLeft,
  Play,
  RefreshCw,
  Download,
  Eye,
  EyeOff
} from "lucide-react";

interface PredictionData {
  dates: string[];
  predictions: number[];
}

interface ModelConfig {
  title: string;
  description: string;
  apiRoute: string;
  variables: {
    value: string;
    label: string;
    icon: React.ComponentType;
    color: string;
    unit?: string;
  }[];
  defaultDays: number;
  maxDays: number;
  minDays: number;
}

// Configuration for different models - easily extensible
const modelConfigs: Record<string, ModelConfig> = {
  weather: {
    title: "Predicción Meteorológica",
    description: "Predice variables meteorológicas usando inteligencia artificial",
    apiRoute: `http://localhost:7000/predict/xgboost`,

    variables: [
      { value: "Temp_max", label: "Temperatura Máxima", icon: Thermometer, color: "text-red-500", unit: "°C" },
      { value: "Temp_min", label: "Temperatura Mínima", icon: Thermometer, color: "text-blue-500", unit: "°C" },
      { value: "Humedad", label: "Humedad Relativa", icon: Droplets, color: "text-cyan-500", unit: "%" },
      { value: "Precipitacion", label: "Precipitación", icon: CloudRain, color: "text-indigo-500", unit: "mm" }
    ],
    defaultDays: 7,
    maxDays: 30,
    minDays: 1
  },
  // Add more models here easily
  stock: {
    title: "Predicción de Acciones",
    description: "Predice el comportamiento de acciones del mercado",
    apiRoute: "/api/stock-prediction",
    variables: [
      { value: "price", label: "Precio", icon: TrendingUp, color: "text-green-500", unit: "$" },
      { value: "volume", label: "Volumen", icon: BarChart3, color: "text-purple-500", unit: "K" }
    ],
    defaultDays: 5,
    maxDays: 14,
    minDays: 1
  }
};

interface ModelPredictionProps {
  modelType?: keyof typeof modelConfigs;
}

const ModelPrediction: React.FC<ModelPredictionProps> = ({ modelType = 'weather' }) => {
  const config = modelConfigs[modelType];
  
  const [n, setN] = useState(config.defaultDays);
  const [variable, setVariable] = useState(config.variables[0].value);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(config.apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ n, variable }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
    setError(null);
  };

  const exportData = () => {
    if (!prediction) return;
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Fecha,Predicción\n" + 
      prediction.dates.map((date, index) => 
        `${date},${prediction.predictions[index]}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `prediccion_${variable}_${n}dias.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedVariable = config.variables.find(v => v.value === variable);
  const IconComponent = selectedVariable?.icon || TrendingUp;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{config.title}</h1>
          <p className="text-blue-200 text-lg">{config.description}</p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {!prediction && (
            <div className="p-8">
              {/* Form Header */}
              <div className="flex items-center space-x-3 mb-6">
                <IconComponent className={`w-6 h-6 ${selectedVariable?.color || 'text-blue-500'}`} />
                <h2 className="text-2xl font-semibold text-white">Configurar Predicción</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Days Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Número de días para predecir
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={n}
                      onChange={(e) => setN(Number(e.target.value))}
                      min={config.minDays}
                      max={config.maxDays}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute right-3 top-3 text-gray-400 text-sm">
                      {config.minDays}-{config.maxDays} días
                    </div>
                  </div>
                </div>

                {/* Variable Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    <TrendingUp className="inline w-4 h-4 mr-2" />
                    Variable a predecir
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {config.variables.map((v) => {
                      const VarIcon = v.icon;
                      return (
                        <label
                          key={v.value}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                            variable === v.value
                              ? `border-blue-500 bg-blue-600/10 ${v.color}`
                              : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <input
                            type="radio"
                            name="variable"
                            value={v.value}
                            checked={variable === v.value}
                            onChange={(e) => setVariable(e.target.value)}
                            className="sr-only"
                          />
                          <VarIcon />
                          <span className="font-medium">{v.label}</span>
                          {v.unit && <span className="text-sm opacity-75">({v.unit})</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="border-t border-gray-700 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>Opciones avanzadas</span>
                  </button>
                  
                  {showAdvanced && (
                    <div className="mt-4 p-4 bg-gray-700/30 rounded-lg">
                      <p className="text-sm text-gray-400">
                        Modelo: {modelType.toUpperCase()} | 
                        Rango: {config.minDays}-{config.maxDays} días | 
                        Variable seleccionada: {selectedVariable?.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generando predicción...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Generar Predicción</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-6 bg-red-900/20 border-l-4 border-red-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-200 font-medium">Error en la predicción</p>
              </div>
              <p className="text-red-300 mt-1">{error}</p>
              <button
                onClick={resetPrediction}
                className="mt-3 text-red-400 hover:text-red-300 underline"
              >
                Intentar nuevamente
              </button>
            </div>
          )}

          {/* Results */}
          {prediction && (
            <div className="p-8">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-6 h-6 ${selectedVariable?.color || 'text-blue-500'}`} />
                  <h2 className="text-2xl font-semibold text-white">
                    Predicción de {selectedVariable?.label}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={exportData}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar</span>
                  </button>
                  <button
                    onClick={resetPrediction}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Regresar</span>
                  </button>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">
                    {prediction.predictions.length}
                  </div>
                  <div className="text-gray-400 text-sm">Predicciones</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">
                    {Math.max(...prediction.predictions).toFixed(2)}
                  </div>
                  <div className="text-gray-400 text-sm">Valor máximo</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">
                    {Math.min(...prediction.predictions).toFixed(2)}
                  </div>
                  <div className="text-gray-400 text-sm">Valor mínimo</div>
                </div>
              </div>

              {/* Results Table */}
              <div className="bg-gray-700/30 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-600/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Predicción
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Tendencia
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      {prediction.dates.map((date, index) => {
                        const value = prediction.predictions[index];
                        const prevValue = index > 0 ? prediction.predictions[index - 1] : value;
                        const trend = value > prevValue ? 'up' : value < prevValue ? 'down' : 'stable';
                        
                        return (
                          <tr key={index} className="hover:bg-gray-600/30 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {new Date(date).toLocaleDateString('es-ES', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold text-white">
                                  {value.toFixed(2)}
                                </span>
                                {selectedVariable?.unit && (
                                  <span className="text-sm text-gray-400">
                                    {selectedVariable.unit}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-1">
                                {trend === 'up' && (
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                )}
                                {trend === 'down' && (
                                  <TrendingUp className="w-4 h-4 text-red-400 transform rotate-180" />
                                )}
                                {trend === 'stable' && (
                                  <div className="w-4 h-0.5 bg-gray-400 rounded"></div>
                                )}
                                <span className={`text-sm ${
                                  trend === 'up' ? 'text-green-400' : 
                                  trend === 'down' ? 'text-red-400' : 'text-gray-400'
                                }`}>
                                  {trend === 'up' ? 'Subida' : 
                                   trend === 'down' ? 'Bajada' : 'Estable'}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelPrediction; 