import './Dashboard.css';
import { useState, useEffect } from 'react';

function Dashboard() {
    // Sample static data
    const [data, setData] = useState([
        { id: 1, name: 'New York', aqi: 42, temperature: 12, pollutant: 'PM2.5', date: '2023-10-20' },
        { id: 2, name: 'Los Angeles', aqi: 58, temperature: 22, pollutant: 'Ozone', date: '2023-10-19' },
        // ... more data items
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [minAQI, setMinAQI] = useState(0);
    const [maxAQI, setMaxAQI] = useState(500);


    const totalItems = data.length;
    const averageAQI = data.reduce((acc, item) => acc + (item.aqi || 0), 0) / totalItems;
    const maxTemperature = Math.max(...data.map(item => item.temperature || 0));

    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.aqi >= minAQI && item.aqi <= maxAQI
    );

    // Sample function to format date from 'YYYY-MM-DDTHH:MM:SS.sssZ' to 'MM-DD-YYYY'
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    };

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
                        <label>AQI Range:</label>
                        <input 
                            type="range" 
                            name="minAQI" 
                            min="0" 
                            max="500" 
                            step="10" 
                            value={minAQI} 
                            onChange={e => setMinAQI(e.target.value)} 
                        />
                        <input 
                            type="range" 
                            name="maxAQI" 
                            min="0" 
                            max="500" 
                            step="10" 
                            value={maxAQI} 
                            onChange={e => setMaxAQI(e.target.value)} 
                        />
                    </div>
                    <button className="btn">Search</button>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>AQI</th>
                                <th>Temperature (°C)</th>
                                <th>Main Pollutant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item.id}> {/* Assuming each item has a unique 'id' */}
                                    <td>{formatDate(item.date)}</td>
                                    <td>{item.aqi}</td>
                                    <td>{item.temperature}°C</td>
                                    <td>{item.pollutant}</td>
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
