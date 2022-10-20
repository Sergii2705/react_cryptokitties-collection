import InfiniteScroll from 'react-infinite-scroll-component';
import { TypeKitty } from '../../types/TypeKitty';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import './CardsList.scss';

interface Props {
  listOfCards: TypeKitty[],
  addPageOfCards: () => void,
  hasMore: boolean,
};

const EndMessage = () => (
  <p className="endMessage">
    <b>Yay! You have seen it all</b>
  </p>
);

export const CardsList: React.FC<Props> = (props) => {
  const {
    listOfCards,
    addPageOfCards, 
    hasMore,
  } = props;

  return (
    <InfiniteScroll
      dataLength={listOfCards.length}
      next={addPageOfCards}
      hasMore={hasMore}
      loader={<Loader />}
      endMessage={ <EndMessage /> }
    >
      {listOfCards &&
        <div className="catalog">
          {listOfCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>}
    </InfiniteScroll>
  );
}