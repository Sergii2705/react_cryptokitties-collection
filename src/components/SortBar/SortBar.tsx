import Select from 'react-select'
import { SortType } from '../../types/SortType';
import { CardsPerPageType } from '../../types/CardsPerPageType';
import './SortBar.scss';

const optionsSelectCardsPerPage = [
  { value: 24, label: '24' },
  { value: 32, label: '32' },
  { value: 48, label: '48' },
  { value: 56, label: '56' }
];

const optionsSelectSortBy = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Name' },
  { value: 'category', label: 'Category' },
  { value: 'price', label: 'Price' }
];

const optionsSelectSortDir = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
]

interface Props {
  cardsPerPage: CardsPerPageType | null,
  sortBy: SortType | null,
  sortDir: SortType | null,
  handlerChangeCardsPerPage: (event: CardsPerPageType | null) => void,
  handlerChangeSortBy: (event: SortType | null) => void,
  handlerChangeSortDir: (event: SortType | null) => void,
}

export const SortBar: React.FC<Props> = (props) => {
  const {
    cardsPerPage,
    sortBy,
    sortDir,
    handlerChangeCardsPerPage,
    handlerChangeSortBy,
    handlerChangeSortDir,
  } = props;

  return (
    <div className="selects" >
      <Select  
        placeholder={'Select sort by...'}
        isClearable
        value={sortBy}
        onChange={handlerChangeSortBy}
        options={optionsSelectSortBy} 
      />

      <Select  
        placeholder={'Select sort direction...'}
        isClearable
        value={sortDir}
        onChange={handlerChangeSortDir}
        options={optionsSelectSortDir} 
      />
      
      <Select  
        value={cardsPerPage}
        onChange={handlerChangeCardsPerPage}
        options={optionsSelectCardsPerPage} 
      />
    </div>
  )
}