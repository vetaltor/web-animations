import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../page/HomePage/HomePage';
import { LottiePage } from '../page/LottiePage';
import { RivePage } from '../page/RivePage';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lottie" element={<LottiePage />} />
          <Route path="/rive" element={<RivePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
