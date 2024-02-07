import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../page/HomePage/HomePage';
import { LottiePage } from '../page/LottiePage';
import { RivePage } from '../page/RivePage';
import { HashRouter } from 'react-router-dom';

export function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/lottie" element={<LottiePage />} />
          <Route path="/rive" element={<RivePage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
