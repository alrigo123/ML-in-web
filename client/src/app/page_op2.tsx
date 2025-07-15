"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Weather Forecasting for Andenes, Cusco
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Harnessing cutting-edge AI and statistical models to deliver accurate weather predictions for Andenes, Cusco, Peru. Plan ahead with confidence.
          </p>
          <div className="mt-8">
            <a
              href="/predict"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Explore Predictions
            </a>
          </div>
        </section>

        {/* Location Map Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Andenes, Cusco, Peru
          </h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15502.297465465614!2d-71.9730727!3d-13.5319503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd5d8266944b1%3A0x4b5b8e4d4b4b4b4b!2sAndenes%2C%20Cusco%2C%20Peru!5e0!3m2!1sen!2sus!4v1697051234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Explore the geographical context of Andenes, Cusco, where our weather predictions are tailored.
          </p>
        </section>

        {/* Features/Models Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Models</h3>
            <p className="text-gray-600">
              Leverage advanced machine learning with <span className="font-medium">Random Forest</span>, <span className="font-medium">LSTM</span>, and <span className="font-medium">XGBoost</span> for robust weather time series predictions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Statistical Models</h3>
            <p className="text-gray-600">
              Utilize time-tested statistical approaches like <span className="font-medium">(S)ARIMA</span> and <span className="font-medium">Holt-Winters Exponential Smoothing</span> for precise forecasting.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Localized Accuracy</h3>
            <p className="text-gray-600">
              Tailored for Andenes, Cusco, our models analyze local weather patterns to provide reliable, region-specific predictions.
            </p>
          </div>
        </section>

        {/* Sample Weather Plots Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Weather Data Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Temperature Trends</h3>
              <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">
                  Placeholder for Temperature Time Series Plot (e.g., LSTM Prediction)
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                Visualize temperature forecasts over time using our AI and statistical models.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Precipitation Forecast</h3>
              <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">
                  Placeholder for Precipitation Time Series Plot (e.g., XGBoost Prediction)
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                Explore precipitation patterns with high accuracy for Andenes, Cusco.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center bg-blue-600 text-white py-12 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Predict the Weather?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Discover how our AI-driven and statistical models can help you stay ahead of the weather in Andenes, Cusco.
          </p>
          <a
            href="/get-started"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started Now
          </a>
        </section>
      </div>
    </main>
  );
}







