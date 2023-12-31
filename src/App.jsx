import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Cards from './components/Cards.jsx'
import Dashboard from './components/Dashboard.jsx'
import { Routes, Route, Outlet } from 'react-router-dom';
import DateDetail from './routes/DateDetail.jsx';

function App() {
  const [todaysAQI, setTodaysAQI] = useState(null);
  const [avgAQI, setAvgAQI] = useState(null);
  const [worstAQI, setWorstAQI] = useState(null);
  const [bestAQI, setBestAQI] = useState(null);

  return (
    <div className="App">
      <Sidebar />
      <Cards 
        todaysAQI={todaysAQI}
        avgAQI={avgAQI}
        worstAQI={worstAQI}
        bestAQI={bestAQI}
      />
      <Routes>
          <Route index element={<Dashboard 
            setTodaysAQI={setTodaysAQI}
            setAvgAQI={setAvgAQI}
            setWorstAQI={setWorstAQI}
            setBestAQI={setBestAQI}
          />} />
          <Route path=":date" element={<DateDetail />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
