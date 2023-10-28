import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './DateDetail.css';
import { useParams } from 'react-router-dom';
import { getAQIStatus } from '../components/utils';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const NY_LAT = 40.7128;
const NY_LON = -74.0060;

function DateDetail() {
  const { date } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataForDate = async () => {
      const startDate = new Date(date).getTime() / 1000;
      const endDate = startDate + 24 * 60 * 60; // One day in UNIX timestamp

      const API_ENDPOINT = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${NY_LAT}&lon=${NY_LON}&start=${startDate}&end=${endDate}&appid=${ACCESS_KEY}`;

      try {
        const response = await fetch(API_ENDPOINT);
        const result = await response.json();
        setData(result.list[0]); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForDate();
  }, [date]);

  if (!data) {
    return <div>Loading data...</div>;
  }

  const mainPollutant = Object.keys(data.components).reduce((a, b) => data.components[a] > data.components[b] ? a : b);

  return (
    <div className="App">
      <Sidebar />
      <div className="details">
        <h3>Date: {date}</h3>
        <h3>Air Quality Index(1-5): {data.main.aqi}</h3>
        <h3>Air Quality Status: {getAQIStatus(data.main.aqi)}</h3>
        <h3>Main Pollutant: {mainPollutant}</h3> {/* Added this line */}
      </div>
    </div>
  );
}

export default DateDetail;
