import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from "react";
import cn from "classnames";

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
]
// sortField = {
//   sort
// }

// }
const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

// const [isReversed, setIsReversed] = useState(false)


export const App = () => {
    const [sortField, setSortField] = useState("");
    const [isReversed, setIsReversed] = useState(false);



    let sortedListGoods = getPrepareGoods(goodsFromServer , sortField , isReversed)



    function getPrepareGoods(goods, sortField , isReversed) {
      let SortedGoods = [...goods];
      if (sortField) {
        SortedGoods.sort((good1, good2) => {
          switch (sortField) {
            case SORT_FIELD_NAME:
              return good1.localeCompare(good2);
            case SORT_FIELD_LENGTH:
              return good2.length - good1.length
            default:  return 0;
          }
        });
      }
      if (isReversed) {
        SortedGoods.reverse();
      }
      return SortedGoods;
    }

const handleReverse = () => {
  setIsReversed(prevState => !prevState);
};

const handleReset = () => {
  setSortField("");
  setIsReversed(false);
};


return (
  <div className="section content">
    <div className="buttons">
      <button
        onClick={() => setSortField(SORT_FIELD_NAME)}
        type="button"
        className={cn('button is-info', {'is-light': sortField !== SORT_FIELD_NAME})}>
        Sort alphabetically
      </button>
      <button
        onClick={() => setSortField(SORT_FIELD_LENGTH)}
        type="button"
        className={cn('button is-success', {'is-light': sortField !== SORT_FIELD_LENGTH})}
      >
        Sort by length
      </button>

      <button onClick={handleReverse} type="button" className={cn('button is-warning', {'is-light': !isReversed})}>
        Reverse
      </button>
      <button onClick={handleReset} type="button" className="button is-danger is-light">
        Reset
      </button>
    </div>

    <ul>
      {sortedListGoods.map(good => (
        <li data-cy="Good"> {good}</li>
      ))}
    </ul>
  </div>
);
}
;
