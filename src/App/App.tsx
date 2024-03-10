import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../page/HomePage/HomePage';
import { LottiePage } from '../page/LottiePage';
import { HashRouter } from 'react-router-dom';
import { Blend } from '../animation/rive/Blend';
import { Sage } from '../animation/rive/Sage';

export function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="lottie/*" element={<LottiePage />} />
          <Route path="rive/*" element={<Sage />} />
          <Route path="rive-blend/*" element={<Blend />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
