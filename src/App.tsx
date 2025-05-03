import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Components from './pages/Components';
import { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/components" element={<Components />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;