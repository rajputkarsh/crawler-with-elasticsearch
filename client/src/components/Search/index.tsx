import {
  useState,
  useEffect,
  ChangeEvent,
  startTransition,
  useTransition,
} from "react";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { AppStore } from "../../redux/store";
import { resetSearch, searchClients } from "../../redux/store/clients.slice";

type DebounceFunc<T extends any[]> = (...args: T) => void;

function Search() {
  const debounce = <T extends any[]>(
    fn: DebounceFunc<T>,
    delay: number = 1000
  ) => {
    let timeoutId: number | undefined;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const dispatch = useDispatch<AppStore>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const updateSearchTerm = (newTerm: string) => {
    setSearchTerm(() => newTerm);
  };

  const fetchSearchResults = debounce((term) => {
    startTransition(() => {
      if(!term) {
        dispatch(resetSearch());
      } else {
        dispatch(searchClients({ term }));
      }
    });
  }, 1000);

  useEffect(() => {
    fetchSearchResults(searchTerm);
  }, [searchTerm]);

  return (
    <div className="w-full px-4 text-center">
      <div className="form-group my-2">
        <input
          type="text"
          className={`form-control`}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            updateSearchTerm(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
      {isPending && <Loader />}
    </div>
  );
}

export default Search;
