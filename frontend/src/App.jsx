import './App.css';
import { Route, Routes } from 'react-router-dom'
import Tag from './pages/Tag';
import Scanner from './pages/Scanner';
import Admin from './pages/admin';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin/>} />
        <Route path="/scanner" element={<Scanner/>} />
        <Route path="/tag" element={<Tag/>} />
      </Routes>
    </>
  )
}

export default App;
