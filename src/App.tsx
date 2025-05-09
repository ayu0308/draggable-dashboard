import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Forms from './pages/Forms';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import FormBuilder from './pages/FormBuilder';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  isOpen={isSidebarOpen} 
                  onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                  isMobile={isMobile}
                />
                <div 
                  className={`flex-1 transition-all duration-300 ${
                    isMobile 
                      ? 'ml-0' 
                      : isSidebarOpen 
                        ? 'ml-64' 
                        : 'ml-20'
                  }`}
                >
                  <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                  <main className="h-[calc(100vh-4rem)] overflow-auto p-4 md:p-6">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <PrivateRoute>
                            <Dashboard />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/forms"
                        element={
                          <PrivateRoute>
                            <Forms />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path="/forms/form-builder"
                        element={
                          <PrivateRoute>
                            <FormBuilder />
                          </PrivateRoute>
                        }
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;