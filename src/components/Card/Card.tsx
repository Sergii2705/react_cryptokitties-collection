import { TypeKitty } from "../../types/TypeKitty";
import './Card.scss';
import { noImg, availableImg, notAvailableImg} from '../../images';
import { useCallback } from "react";

interface Props {
  card: TypeKitty,
}

export const Card: React.FC<Props> = ({ card }) => {
  const {
    name,
    category,
    price,
    image_url,
    available,
  } = card;

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = noImg;
  }, []);

  return (
    <div className="card">
      <div className="card__title">
        <h3 className="card__name"> 
          {name} 
        </h3>

        <p className="card__category"> 
          {category} 
        </p>
      </div>
      
      {available ? (
        <img
          className="card__img-available" 
          src={availableImg} 
          alt="available" 
        />
      ) : (
        <img
          className="card__img-not-available" 
          src={notAvailableImg} 
          alt="not available" 
        />
      )}
      <img
        className="card__img" 
        src={image_url} 
        alt="kitty" 
        onError={handleError}
      />

      <p className="card__price">
        {`₴ ${price.toLocaleString('en-US')}`}
      </p>
    </div>
  )
}