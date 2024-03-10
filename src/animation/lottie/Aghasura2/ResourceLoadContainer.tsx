// import { Aghasura } from '../../animation/lottie/Aghasura';
import { useFont } from '../../../shared/hook/useFont';
import ShantellSans from './../../../assets/font/ShantellSans-Light.woff2';
import { Aghasura2 } from './Aghasura2';

export function ResourceLoadContainer() {

  const fontLoading = useFont({
    url: ShantellSans as string,
    family: 'ShantellSans-Light',
    weight: '300',
    style: 'normal'
  });

  console.log(fontLoading);

  if (fontLoading !== 'loaded') {
    return null;
  }

  return (
    <Aghasura2/>
  );
}
