# Climate Weather Dashboard

A responsive, interactive dashboard for visualizing climate and weather data with modern React components and data visualization.


## 🚧 Project Status: Work in Progress

This project is currently under active development. Many features are still being implemented, and some components may not be fully functional yet.

## 📋 Overview

Climate Weather Dashboard is a modern web application that provides real-time weather information, historical data comparisons, and environmental impact metrics in an intuitive interface. The application features a responsive design with light and dark mode support.

## ✨ Features

- **Current Weather Metrics**: Display of current temperature, humidity, wind speed, and more
- **Interactive Weather Map**: Visual representation of weather patterns for selected locations
- **Historical Data Comparison**: Compare current weather with historical averages
- **Weather Trends**: Visualize changes in weather patterns over time
- **Precipitation Forecasts**: Display rainfall predictions with interactive charts
- **Environmental Impact Metrics**: Show climate change indicators and environmental data
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Auto-refresh**: Weather data automatically refreshes every 15 minutes

## 🛠️ Tech Stack

- **React**: Frontend UI library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Material Tailwind**: UI component library
- **Chart.js & React-Chartjs-2**: Data visualization
- **Leaflet**: Interactive mapping
- **Phosphor Icons**: Modern iconography

## 📦 Dependencies

### Core Dependencies
- react
- react-dom
- @material-tailwind/react
- chart.js
- react-chartjs-2
- leaflet
- @phosphor-icons/react

### Development Dependencies
- vite
- eslint
- tailwindcss
- autoprefixer
- postcss

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kingo00000/dashboard.git
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
climate-weather-dashboard/
├── public/              # Static assets
├── src/
│   ├── api/             # API service functions
│   ├── components/      # React components
│   │   ├── Header.jsx
│   │   ├── KeyMetrics.jsx
│   │   ├── WeatherTrends.jsx
│   │   ├── MapView.jsx
│   │   ├── PrecipitationChart.jsx
│   │   ├── Forecast.jsx
│   │   ├── HistoricalComparison.jsx
│   │   ├── EnvironmentalImpact.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   └── HomePage.jsx
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── .eslintrc.cjs        # ESLint configuration
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🔧 Configuration

The application can be configured by modifying:
- `src/api/weatherApi.js` - API endpoints and data transformations
- `tailwind.config.js` - Custom theme options
- `vite.config.js` - Build and development server options

## 🧪 Known Issues & Upcoming Features

### Known Issues
- Some components may display placeholder data
- API integration is not complete
- Error handling needs improvement

### Upcoming Features
- User authentication and profiles
- Saved locations
- Weather alerts and notifications
- Offline support with service workers
- Detailed weather reports
- Historical data analysis tools
- More environmental impact metrics
- Enhanced visualization options


## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/dashboard/issues).

