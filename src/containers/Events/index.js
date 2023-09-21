import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

  
const filterEvents = (data, type, page) =>
  (data?.events || [])
  .filter((event) => {
    if(!type) {
        return true;
    }
    return event.type.toLowerCase() === type.toLowerCase(); 
  }
  ).filter((event, index) => {
    if (
      (page - 1) * PER_PAGE <= index &&
      PER_PAGE * page > index
    ) {
      return true;
    }
    return false;
  })


const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredEvents, setFilteredEvents] = useState(filterEvents(data, type, currentPage))

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    setFilteredEvents(filterEvents(data, evtType, 1));
  };
  
  useEffect (()=> {
    setFilteredEvents(filterEvents(data, type, currentPage))
  },[data, type, currentPage])

  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(e) =>changeType(e)}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
