import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';
import Layout from './pages/Layout/Layout';
import CVBuilder from './pages/CVBuilder/CVBuilder';
import Contact from './pages/Contact/Contact';
import Auth from './pages/Auth/Auth';
import CVUserList from './pages/CVUserList/CVUserList';
import Dashoard from './pages/Dashboard/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="builder" element={<CVBuilder />} />
          <Route path="builder/:id" element={<CVBuilder />} />
          <Route path="contact" element={<Contact />} />
          <Route path="auth" element={<Auth />} />
          <Route path="mycvs" element={<CVUserList />} />
          <Route path="dashboard" element={<Dashoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
