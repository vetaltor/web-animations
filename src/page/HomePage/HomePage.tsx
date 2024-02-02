import s from './HomePage.module.css';
import LinkStyles from './Link.module.css';

export function HomePage() {
  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <a className={LinkStyles.root} href="/lottie">
          Lottie
        </a>
        <a className={LinkStyles.root} href="/rive">
          Rive
        </a>
      </nav>
    </div>
  );
}
