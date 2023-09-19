import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const [radioIndex, setRadioIndex] = useState(0);
  const handleRadioChange = (event) => {
    setIndex(event.target.value);
    setRadioIndex(event.target.value);
  }

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) - new Date(evtB.date)
  );

  /* let byDateDescLength = 0;
  if (byDateDesc.length === undefined) {
    byDateDescLength = 1;
  } else {
    byDateDescLength = byDateDesc.length;
  } */
  
  const nextCard = () => {
    // console.log(data)
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    setRadioIndex(index);
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img key={event.index} src={event.cover} alt="forum" />
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
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIndex === radioIdx}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
