import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Cloud, Sun, Wind, Droplets, Thermometer, Search } from 'lucide-react';

// --- ICONS AND WARDROBE DATA (No changes here) ---
const wardrobe = [
    // --- TOPS ---
    { name: 'T-Shirt', category: 'Top', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" /></svg>, tags: ['hot', 'warm'] },
    { name: 'Long Sleeve', category: 'Top', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 4l6 2v5h-3v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-8h-3v-5l6 -2a3 3 0 0 0 6 0" /><path d="M3.5 11h17" /></svg>, tags: ['cool'] },
    { name: 'Sweater', category: 'Top', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></svg>, tags: ['cold'] },

    // --- BOTTOMS ---
    { name: 'Shorts', category: 'Bottoms', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 4h8a2 2 0 0 1 2 2v4a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-4a2 2 0 0 1 2 -2z" /><path d="M8 12l-3 9" /><path d="M16 12l3 9" /><path d="M12 11v5" /></svg>, tags: ['hot'] },
    { name: 'Jeans', category: 'Bottoms', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 4h8a2 2 0 0 1 2 2v4a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-4a2 2 0 0 1 2 -2z" /><path d="M8 12l-2 9" /><path d="M16 12l2 9" /><path d="M12 11v10" /></svg>, tags: ['warm', 'cool', 'cold'] },

    // --- OUTERWEAR ---
    { name: 'Light Jacket', category: 'Outerwear', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15h12a3 3 0 0 0 0 -6h-12v6z" /><path d="M6 9h12a3 3 0 0 0 0 -6h-12v6z" /><path d="M6 9v-4" /><path d="M18 5v4" /></svg>, tags: ['cool', 'windy'] },
    { name: 'Winter Coat', category: 'Outerwear', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-6z" /><path d="M6 9v-3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v3" /></svg>, tags: ['cold'] },
    { name: 'Raincoat', category: 'Outerwear', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-6z" /><path d="M6 9v-3a3 3 0 0 1 3 -3h6a3 3 0 0 1 3 3v3" /><path d="M12 3l0 18" /></svg>, priority: 1, tags: ['rainy', 'cool', 'warm'] },

    // --- ACCESSORIES ---
    { name: 'Scarf', category: 'Accessory', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 22v-5a2 2 0 0 0 -2 -2h-4a2 2 0 0 0 -2 2v5" /><path d="M12 17a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v5" /><path d="M12 15v-13" /></svg>, tags: ['cold'] },
    { name: 'Umbrella', category: 'Accessory', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12a8 8 0 0 1 16 0" /><path d="M12 12v8a2 2 0 0 0 4 0" /></svg>, priority: 2, tags: ['rainy'] },
    { name: 'Sunglasses', category: 'Accessory', icon: <svg width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 4h-2l-3 10" /><path d="M16 4h2l3 10" /><path d="M10 16h4" /><path d="M21 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5" /><path d="M3 16.5a3.5 3.5 0 0 0 7 0v-2.5h-7v2.5" /></svg>, tags: ['sunny'] },
];

const AppStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

    :root {
        --color-bg: #0d1117;
        --color-bg-light: #161b22;
        --color-text: #ffffff;
        --color-text-muted: #8b949e;
        --color-accent: #d4af37; /* Gold accent */
        --color-accent-dark: #b8860b; /* Darker gold */
        --color-panel-bg: rgba(22, 27, 34, 0.6);
        --color-panel-border: #30363d;
        --color-error-bg: rgba(248, 81, 73, 0.1);
        --color-error-border: rgba(248, 81, 73, 0.4);
    }

    body {
        font-family: 'Inter', sans-serif;
        color: var(--color-text);
        margin: 0;
        background-color: var(--color-bg);
    }

    .page-container {
        min-height: 100vh;
        background: var(--color-bg);
        padding: 1rem;
    }

    .content-wrapper {
        max-width: 960px;
        margin: 0 auto;
    }

    .app-header {
        text-align: center;
        margin-bottom: 3rem;
        padding-top: 2rem;
    }

    .app-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--color-text);
        letter-spacing: -0.025em;
    }

    .app-subtitle {
        color: var(--color-text-muted);
        margin-top: 0.75rem;
        font-size: 1.125rem;
    }

    .search-form {
        position: relative;
        margin-bottom: 2rem;
        display: flex;
        gap: 0.5rem;
    }

    .search-input {
        width: 100%;
        background-color: var(--color-bg-light);
        color: var(--color-text);
        border-radius: 9999px;
        padding: 0.875rem 1.5rem;
        font-size: 1.125rem;
        border: 1px solid var(--color-panel-border);
        transition: all 0.3s ease;
    }
    .search-input::placeholder { color: var(--color-text-muted); }
    .search-input:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
    }

    .search-button {
        background-color: var(--color-accent-dark);
        color: var(--color-text);
        font-weight: 700;
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .search-button:hover { background-color: var(--color-accent); }

    .suggestions-list {
        position: absolute;
        z-index: 10;
        width: 100%;
        top: calc(100% + 0.5rem);
        background-color: var(--color-bg-light);
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        border: 1px solid var(--color-panel-border);
        list-style: none;
        padding: 0;
    }

    .suggestion-item {
        padding: 1rem 1.5rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        border-bottom: 1px solid var(--color-panel-border);
        font-weight: 600;
        color: var(--color-text);
    }
    .suggestion-item:last-child { border-bottom: none; }
    .suggestion-item:hover { background-color: rgba(212, 175, 55, 0.1); }

    .loading-indicator, .error-message { text-align: center; padding: 2rem; }
    .loading-spinner {
        animation: spin 1s linear infinite;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        border: 2px solid var(--color-panel-border);
        border-top-color: var(--color-accent);
        margin: 0 auto;
    }
    .error-message {
        background-color: var(--color-error-bg);
        border: 1px solid var(--color-error-border);
        border-radius: 1rem;
        font-weight: 600;
        color: #ff8982;
    }

    .results-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .weather-card, .outfit-card {
        background-color: var(--color-panel-bg);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-radius: 1.5rem;
        padding: 1.5rem;
        border: 1px solid var(--color-panel-border);
    }
    
    .weather-card-city, .outfit-title, .weather-temp {
        color: var(--color-text);
        font-weight: 800;
    }

    .weather-card-city { font-size: 2rem; margin-bottom: 1.5rem; text-align: center; }
    .weather-card-main { display: flex; align-items: center; justify-content: center; gap: 2rem; }
    .weather-condition-text { text-transform: capitalize; font-size: 1.125rem; color: var(--color-text-muted); text-align: center; margin-top: 0.25rem; }
    .weather-temp { font-size: 4.5rem; line-height: 1; }
    .weather-stat { display: flex; align-items: center; color: var(--color-text-muted); margin-top: 0.5rem; }
    .weather-stat svg { margin-right: 0.5rem; }

    .outfit-title { font-size: 1.75rem; margin-bottom: 1.5rem; text-align: center; }
    .outfit-category { margin-bottom: 1.25rem; }
    .outfit-category-title {
        font-weight: 700;
        font-size: 1.125rem;
        color: var(--color-accent);
        margin-bottom: 0.75rem;
        border-bottom: 1px solid var(--color-panel-border);
        padding-bottom: 0.5rem;
    }
    .outfit-items { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .outfit-item {
        display: flex;
        align-items: center;
        background-color: var(--color-bg-light);
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        font-weight: 600;
        border: 1px solid var(--color-panel-border);
        color: var(--color-text); /* Explicitly set text to white */
    }
    .outfit-item svg { color: var(--color-accent); margin-right: 0.75rem; }

    .app-footer { text-align: center; margin-top: 4rem; padding-bottom: 2rem; color: var(--color-text-muted); font-size: 0.875rem; }
    .footer-link {
        font-weight: 600;
        color: var(--color-accent);
        transition: color 0.3s ease;
        text-decoration: none;
    }
    .footer-link:hover { color: #e6c35c; }

    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    @media (min-width: 640px) { .page-container { padding: 1.5rem; } .app-title { font-size: 3rem; } }
    @media (min-width: 768px) { .page-container { padding: 2rem; } .app-title { font-size: 4rem; } .results-grid { grid-template-columns: repeat(2, 1fr); } }
`;

const WeatherIcon = ({ condition }) => {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) return <Sun color="#facc15" size={64} />;
    if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast')) return <Cloud color="#9ca3af" size={64} />;
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle') || lowerCaseCondition.includes('shower')) return <Droplets color="#60a5fa" size={64} />;
    if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('sleet') || lowerCaseCondition.includes('ice') || lowerCaseCondition.includes('blizzard')) return <Cloud color="#ffffff" size={64} />;
    if (lowerCaseCondition.includes('mist') || lowerCaseCondition.includes('fog')) return <Cloud color="#6b7280" size={64} />;
    return <Thermometer color="#9ca3af" size={64} />;
};

const App = () => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [weather, setWeather] = useState(null);
    const [outfit, setOutfit] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [debouncedLocation, setDebouncedLocation] = useState(location);
    const inputRef = useRef(null);

    const API_KEY = 'bd7dea15b2984023ae8112107250308';

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = AppStyles;
        document.head.appendChild(styleElement);
        return () => { document.head.removeChild(styleElement); };
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => { setDebouncedLocation(location); }, 500);
        return () => clearTimeout(handler);
    }, [location]);

    useEffect(() => {
        if (debouncedLocation.length > 2 && debouncedLocation.toLowerCase() !== weather?.city?.toLowerCase()) {
            const fetchSuggestions = async () => {
                try {
                    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${debouncedLocation}`);
                    if (!response.ok) return;
                    const data = await response.json();
                    setSuggestions(data);
                } catch (err) { console.error("Suggestion fetch error:", err); }
            };
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [debouncedLocation, API_KEY, weather?.city]);

    const fetchWeather = useCallback(async (query) => {
        setLoading(true);
        setError('');
        setWeather(null);
        setSuggestions([]);
        inputRef.current?.blur();
        
        try {
            const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`);
            if (!weatherResponse.ok) {
                 const errorData = await weatherResponse.json();
                 throw new Error(errorData.error.message || `City not found.`);
            }
            const weatherData = await weatherResponse.json();
            setLocation(weatherData.location.name);
            setWeather({
                temp: weatherData.current.temp_c,
                humidity: weatherData.current.humidity,
                wind: weatherData.current.wind_kph,
                condition: weatherData.current.condition.text,
                is_raining: weatherData.current.precip_mm > 0,
                city: weatherData.location.name,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLocationSelect = (selectedLocation) => {
        fetchWeather(selectedLocation.url);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!location.trim()) return;
        fetchWeather(location);
    };

    useEffect(() => {
        if (weather) {
            const conditions = new Set();
            if (weather.temp > 28) conditions.add('hot');
            if (weather.temp >= 20 && weather.temp <= 28) conditions.add('warm');
            if (weather.temp >= 10 && weather.temp < 20) conditions.add('cool');
            if (weather.temp < 10) conditions.add('cold');
            if (weather.is_raining) conditions.add('rainy');
            if (weather.wind > 20) conditions.add('windy');
            if (weather.condition.toLowerCase().includes('sun')) conditions.add('sunny');

            const getBestItem = (category) => {
                const suitableItems = wardrobe.filter(item => 
                    item.category === category && item.tags.some(tag => conditions.has(tag))
                );
                if (suitableItems.length === 0) return null;
                suitableItems.sort((a, b) => {
                    const aScore = a.tags.filter(tag => conditions.has(tag)).length + (a.priority || 0);
                    const bScore = b.tags.filter(tag => conditions.has(tag)).length + (b.priority || 0);
                    return bScore - aScore;
                });
                return suitableItems[0];
            };
            
            const getAccessories = () => wardrobe.filter(item => 
                item.category === 'Accessory' && item.tags.some(tag => conditions.has(tag))
            );

            setOutfit({
                Top: getBestItem('Top'),
                Bottoms: getBestItem('Bottoms'),
                Outerwear: getBestItem('Outerwear'),
                Accessories: getAccessories()
            });
        }
    }, [weather]);
    
    useEffect(() => {
        fetchWeather('New York');
    }, [fetchWeather]);

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <header className="app-header">
                    <h1 className="app-title">Weather Wardrobe</h1>
                    <p className="app-subtitle">Your personal AI stylist for any weather</p>
                </header>

                <main>
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            ref={inputRef}
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter a city..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <Search size={20}/>
                        </button>
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((s, i) => (
                                    <li key={i} onClick={() => handleLocationSelect(s)} className="suggestion-item">
                                        {s.name}, {s.region ? `${s.region}, ` : ''}{s.country}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>

                    {loading && <div className="loading-indicator"><div className="loading-spinner"></div></div>}
                    {error && <div className="error-message"><p>{error}</p></div>}

                    {weather && !loading && (
                        <div className="results-grid">
                            <div className="weather-card">
                                <h2 className="weather-card-city">{weather.city}</h2>
                                <div className="weather-card-main">
                                    <div className="weather-icon-container">
                                       <WeatherIcon condition={weather.condition} />
                                       <p className="weather-condition-text">{weather.condition}</p>
                                    </div>
                                    <div className="weather-details">
                                        <p className="weather-temp">{Math.round(weather.temp)}°C</p>
                                        <div className="weather-stat">
                                            <Droplets size={20}/>
                                            <span>{weather.humidity}% Humidity</span>
                                        </div>
                                        <div className="weather-stat">
                                            <Wind size={20}/>
                                            <span>{weather.wind.toFixed(1)} kph Wind</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="outfit-card">
                                <h2 className="outfit-title">Today's Outfit Suggestion</h2>
                                <div className="outfit-categories">
                                    {Object.entries(outfit).map(([category, item]) => {
                                        if (!item || (Array.isArray(item) && item.length === 0)) return null;
                                        return (
                                            <div key={category} className="outfit-category">
                                                <h3 className="outfit-category-title">{category}</h3>
                                                <div className="outfit-items">
                                                {(Array.isArray(item) ? item : [item]).map(i => (
                                                    <div key={i.name} className="outfit-item">
                                                        {i.icon}
                                                        <span>{i.name}</span>
                                                    </div>
                                                ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                     {Object.values(outfit).every(v => !v || (Array.isArray(v) && v.length === 0)) && (
                                        <p className="text-center text-gray-400 mt-8">No specific clothing suggestions for this weather. Use your best judgment!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
                 <footer className="app-footer">
                    <p>
                        Made By{' '}
                        <a 
                            href="https://github.com/riisshhuu" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Rishu
                        </a>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default App;
