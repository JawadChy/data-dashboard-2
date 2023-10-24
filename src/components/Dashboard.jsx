import './Dashboard.css';
import Cards from './Cards';
import { useState, useEffect } from 'react';
import { getAQIStatus } from './utils';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const NY_LAT = 40.7128;
const NY_LON = -74.0060;

// Calculate dates for the last 30 days
const endDate = Math.floor(Date.now() / 1000); // Current date in UNIX timestamp
const startDate = endDate - (30 * 24 * 60 * 60); // 30 days ago in UNIX timestamp

const API_ENDPOINT = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${NY_LAT}&lon=${NY_LON}&start=${startDate}&end=${endDate}&appid=${ACCESS_KEY}`;


function Dashboard({ setTodaysAQI, setAvgAQI, setWorstAQI, setBestAQI }) {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minAQI, setMinAQI] = useState(1);
    const [maxAQI, setMaxAQI] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINT);
                const result = await response.json();
                setData(result.list); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, []);

    const totalItems = data.length;
    const averageAQI = Math.round(data.reduce((acc, item) => acc + (item.main.aqi || 0), 0) / totalItems); // Rounded to the nearest whole number

    const filteredData = data.filter(item => 
        item.components.co.toString().includes(searchTerm) && 
        item.main.aqi >= minAQI && item.main.aqi <= maxAQI  
    );

    // Format date to MM-DD-YYYY
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert UNIX timestamp to JS Date
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    };

    const aggregateDataByDate = (data) => {
        const aggregatedData = {};
    
        data.forEach(item => {
            const date = formatDate(item.dt);
            if (!aggregatedData[date]) {
                aggregatedData[date] = {
                    dt: item.dt,
                    count: 0,
                    main: { aqi: 0 },
                    components: {
                        co: 0, no: 0, no2: 0, o3: 0, so2: 0, pm2_5: 0, pm10: 0, nh3: 0
                    }
                };
            }
    
            aggregatedData[date].count++;
            aggregatedData[date].main.aqi += item.main.aqi;
            Object.keys(item.components).forEach(key => {
                aggregatedData[date].components[key] += item.components[key];
            });
        });
    
        // Calculate averages and round AQI to the nearest whole number
        Object.values(aggregatedData).forEach(item => {
            item.main.aqi = Math.round(item.main.aqi / item.count);
            Object.keys(item.components).forEach(key => {
                item.components[key] /= item.count;
            });
        });
    
        return Object.values(aggregatedData);
    };
    
    const aggregatedData = aggregateDataByDate(data);
    
    // Filter out future dates and sort by date
    const today = new Date();
    let filteredAndSortedData = aggregatedData
        .filter(item => new Date(item.dt * 1000) <= today)
        .sort((a, b) => b.dt - a.dt);

    // Apply filtering based on search term and AQI range
    const finalFilteredData = filteredAndSortedData.filter(item => 
        (formatDate(item.dt).toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.main.aqi.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAQIStatus(item.main.aqi).toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(item.components).some(component => component.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.components.co.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.no.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.no2.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.o3.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.so2.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.pm2_5.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.pm10.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.components.nh3.toFixed(2).toLowerCase().includes(searchTerm.toLowerCase())) &&
        item.main.aqi >= minAQI && item.main.aqi <= maxAQI
    );
    
    setTodaysAQI(aggregatedData[0]?.main.aqi || "N/A");
    setAvgAQI(averageAQI || "N/A");
    setWorstAQI(Math.max(...aggregatedData.map(item => item.main.aqi)));
    setBestAQI(Math.min(...aggregatedData.map(item => item.main.aqi)));
    

    return (
        <div className="App-row">
            <div className="List">
                <div className="filters">
                    <div className="dateFilter">
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm} 
                            onChange={e => setSearchTerm(e.target.value)} 
                        />
                    </div>
                    <div className="aqiFilter">
                        <label>Min AQI: {minAQI}</label>
                        <div className="rangeWrapper">
                            <input 
                                type="range" 
                                name="minAQI" 
                                min="1" 
                                max="5" 
                                step="1" 
                                value={minAQI} 
                                onChange={e => setMinAQI(e.target.value)} 
                            />
                        </div>
                        <label>Max AQI: {maxAQI}</label>
                        <div className="rangeWrapper">
                            <input 
                                type="range" 
                                name="maxAQI" 
                                min="1" 
                                max="5" 
                                step="1" 
                                value={maxAQI} 
                                onChange={e => setMaxAQI(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th className="date">Date</th>
                                <th>AQI</th>
                                <th>CO (μg/m3)</th>
                                <th>NO (μg/m3)</th>
                                <th>NO2 (μg/m3)</th>
                                <th>O3 (μg/m3)</th>
                                <th>SO2 (μg/m3)</th>
                                <th>PM2.5 (μg/m3)</th>
                                <th>PM10 (μg/m3)</th>
                                <th>NH3 (μg/m3)</th>
                                <th>Status</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {finalFilteredData.map(item => (
                                <tr key={item.dt}>
                                    <td>{formatDate(item.dt)}</td>
                                    <td>{item.main.aqi}</td>
                                    <td>{item.components.co.toFixed(2)}</td>
                                    <td>{item.components.no.toFixed(2)}</td>
                                    <td>{item.components.no2.toFixed(2)}</td>
                                    <td>{item.components.o3.toFixed(2)}</td>
                                    <td>{item.components.so2.toFixed(2)}</td>
                                    <td>{item.components.pm2_5.toFixed(2)}</td>
                                    <td>{item.components.pm10.toFixed(2)}</td>
                                    <td>{item.components.nh3.toFixed(2)}</td>
                                    <td>{getAQIStatus(item.main.aqi)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;