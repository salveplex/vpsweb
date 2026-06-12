import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Page from './pages/Page';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* Dynamic route for all other pages */}
        <Route path="/:slug" element={<Page />} />
      </Route>
    </Routes>
  );
}

export default App;
