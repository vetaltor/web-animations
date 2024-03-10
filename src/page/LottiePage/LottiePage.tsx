import { Route, Routes } from 'react-router-dom';
import { Jagannath } from '../../animation/lottie/Jagannath';
import { Aghasura2 } from '../../animation/lottie/Aghasura2';
import { Link } from 'react-router-dom';
import s from './LottiePage.module.css';
import LinkStyles from '../../component/Link/Link.module.css';

export function LottiePage() {
  return (
    <Routes>
      <Route path="aghasura2/*" element={<Aghasura2 />} />
      <Route path="jagannath/*" element={<Jagannath />} />
      <Route path="*" element={<PageContent />} />
    </Routes>
  );
}

function PageContent() {
  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <Link className={LinkStyles.root} to="aghasura2">
          Aghasura Demo
        </Link>
        <Link className={LinkStyles.root} to="jagannath">
          Jagannath
        </Link>
      </nav>
    </div>
  );
}
