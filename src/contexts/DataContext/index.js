import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      // start fix .length test issues
      const currentData = await api.loadData();
      	setData(currentData);
				setLast(currentData.events[currentData.events.length -1]); // fix footer thumbnail display
			// end fix .length test issues
    } catch (err) {
      setError(err);
    }
  });

	// start fix .length test & footer thumbnail display issues
	const out = useMemo(() => ({
		data, last, error
	}),[data, last, error])
	// end fix .length test & footer thumbnail display issues

  useEffect(() => {
    if (data) return;
    getData();
  });
  
  return (
		<DataContext.Provider

      value={out} // fix .length test & footer thumbnail display issues
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
