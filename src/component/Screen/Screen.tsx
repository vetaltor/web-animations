import s from './Screen.module.css';

export function Screen({ children }: any) {
  return <div className={s.root}>{children}</div>;
}
