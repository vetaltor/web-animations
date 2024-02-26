// import { Aghasura } from '../../animation/lottie/Aghasura';
import { Aghasura2 } from '../../animation/lottie/Aghasura2';
import { LottieWebSvg } from '../../animation/lottie/LottieWebSvg';
import { useFont } from '../../shared/hook/useFont';
import ShantellSans from './../../assets/font/ShantellSans-Light.woff2';

export function LottiePage() {

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
    // <LottieWebSvg/>
  );
}
