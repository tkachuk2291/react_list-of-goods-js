import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];


const sortAlphabetical = 'name';
const sortLength = 'length';


export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);



  function getPrepareGoods(goods, sortedField, isReverse) {
    let sortedGoods = [...goods];
    if (sortedField) {
      switch (sortedField) {
        case sortAlphabetical:
          sortedGoods.sort((good1, good2) =>good1.localeCompare(good2));
          break;
        case sortLength:
          sortedGoods.sort((good1, good2) => good1.length - good2.length);
          break
        default:
          break;
      }
    }
    if (isReverse) {
      sortedGoods.reverse();
    }
    return sortedGoods;
  }

  let sortedListGoods = getPrepareGoods(goodsFromServer, sortField, isReversed);

  const handleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const makeSetSortField = (sortType) => {
    return () => setSortField(sortType);
  };



  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {makeSetSortField(sortAlphabetical)}}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== sortAlphabetical,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => {makeSetSortField(sortLength)}}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== sortLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button onClick={handleReset} type="button" className="button is-danger is-light">
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedListGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
