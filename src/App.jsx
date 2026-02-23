import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';
import Layout from './pages/Layout/Layout';
import CVBuilder from './pages/CVBuilder/CVBuilder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="builder/:id" element={<CVBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
