
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Main from './pages/Main'
import Register from './pages/Register';
import Login from './pages/Login';
const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
      <Route path="/main" element={<Main />}  />
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </QueryClientProvider>
  )
}

export default App
