import './Cards.css';
import { getAQIStatus } from './utils';

function Cards({ todaysAQI, avgAQI, worstAQI, bestAQI }) { // Receive the function as a prop
    return (
        <div className="Cards">
            <div className="Card">
                <h3 className="stat">Location</h3>
                <h4>New York, NY</h4>
            </div>
            <div className="Card">
                <h3 className="stat">Today's AQI:</h3>
                <h2>{todaysAQI}</h2>
                <h4>Status:{getAQIStatus(todaysAQI)}</h4>
            </div>
            <div className="Card">
                <h3 className="stat">Avg AQI (Last 30 Days):</h3>
                <h2>{avgAQI}</h2>
                <h4>Status:{getAQIStatus(avgAQI)}</h4>
            </div>
            <div className="Card">
                <h3 className="stat">Best AQI (Last 30 Days):</h3>
                <h2>{bestAQI}</h2>
                <h4>Status:{getAQIStatus (bestAQI)}</h4>
            </div>
            <div className="Card">
                <h3 className="stat">Worst AQI (Last 30 Days):</h3>
                <h2>{worstAQI}</h2>
                <h4>Status:{getAQIStatus(worstAQI)}</h4>
            </div>
        </div>
    )
}

export default Cards;
