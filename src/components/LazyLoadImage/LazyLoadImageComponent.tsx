import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type LazyLoadImageProp = {
  image: string
  placeholderImage: string
}
export function LazyLoadImageComponent({ image, placeholderImage }: LazyLoadImageProp) {
  return <LazyLoadImage className='poster' src={`${image}`}
    placeholderSrc={`${placeholderImage}`}
    effect="blur"
  />
}