import { Fragment, useEffect, useState } from "react"; // import react Fragment for fixing carousel bug
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const [radioIndex, setRadioIndex] = useState(0); // add useState for solve Radio button not working
  const handleRadioChange = (event) => { // add a listner for solve Radio button not working
    setIndex(event.target.value);
    setRadioIndex(event.target.value);
  }

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) - new Date(evtB.date) ? -1 : 1 // fix descending date bug
  );
 
  const nextCard = () => {
    setTimeout(
      () => setIndex(index +1 < byDateDesc.length ? index + 1 : 0), // fix blank page bug
      5000
    );
  };

  useEffect(() => {
    if(data) nextCard(); // fix console error for awaiting data is fully charged
    setRadioIndex(index); // fix radio button not working
  },[index, data]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Fragment used for fixing key duplication & unique key id console error
        <Fragment key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIndex === radioIdx}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Slider;
