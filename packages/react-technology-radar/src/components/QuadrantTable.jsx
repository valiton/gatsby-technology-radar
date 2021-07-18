import React, {useState} from 'react';

const QuadrantTable = ({quadrant}) => {
  const [expandedItem, setExpandedItem] = useState(0);

  return (
    <div className={`quadrant-table ${quadrant.order} selected`}>
      <h2 className="quadrant-table__name">{quadrant.name}</h2>
      {quadrant.rings.map(ring => (
        <React.Fragment key={`quadrant-${quadrant.order}-ring-${ring.order}`}>
          <h3>{ring.name}</h3>
          <ul>
            {ring.items.map(item => (
              <li key={`item-${item.number}`}>
                <div
                  id={`list-item-${item.number}`}
                  className="list-item"
                  onClick={() => setExpandedItem(item.number)}
                >
                  {`${item.number}. ${item.name}`}
                </div>
                <div
                  id={`item-description-${item.number}`}
                  className={`item-description ${
                    item.number === expandedItem ? 'expanded' : ''
                  }`}
                >
                  {item.description ? <p>{item.description}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuadrantTable;
