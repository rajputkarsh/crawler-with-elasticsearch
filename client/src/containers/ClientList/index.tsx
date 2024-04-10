import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../../redux/store";
import {
  fetchClientsList,
  getClients,
  getPageLimit,
  getPageNumber,
} from "../../redux/store/clients.slice";
import Loader from "../../components/Loader";
import ClientDetails from "../../components/ClientDetails";

function ClientList() {
  const dispatch = useDispatch<AppStore>();

  const [isPending, startTransition] = useTransition();

  const pageNumber = useSelector<AppState, number>(getPageNumber);
  const pageLimit = useSelector<AppState, number>(getPageLimit);
  const clientsList = useSelector<AppState, Array<{[key: string]: string}>>(getClients);

  const fetchClients = () => {
    startTransition(() => {
      dispatch(fetchClientsList({ page: pageNumber, limit: pageLimit }));
    });
  };

  useEffect(() => {
    fetchClients();
  }, [pageNumber]);

  

  return (
    <div>
      <div className="mx-0 w-100 vh-100 my-2 container">
        <div className="row">
          <h1 className="text-center">Web Scraper</h1>
        </div>
        <div className="row my-2 gy-4 pb-4">
          {clientsList.map((client: { [key: string]: string }) => (
            <div className="fluid col-xs-6 col-md-4" key={client.uuid}>
              <ClientDetails client={client} />
            </div>
          ))}
        </div>
      </div>
      {isPending && <Loader />}
    </div>
  );
}

export default ClientList;
