import { Link } from 'react-router-dom';
import s from './HomePage.module.css';
import LinkStyles from '../../component/Link/Link.module.css';

export function HomePage() {
  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <Link className={LinkStyles.root} to="/lottie">
          Lottie
        </Link>
        <Link className={LinkStyles.root} to="/rive">
          Rive (scrub)
        </Link>
        <Link className={LinkStyles.root} to="/rive-blend">
          Rive (blend)
        </Link>
      </nav>
    </div>
  );
}
