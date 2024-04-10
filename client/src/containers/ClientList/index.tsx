import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../../redux/store";
import {
  fetchClientsList,
  getClients,
  getPageLimit,
  getPageNumber,
  getTotalCount,
  incrementPageNumber,
} from "../../redux/store/clients.slice";
import Loader from "../../components/Loader";
import ClientDetails from "../../components/ClientDetails";
import Dialog from "../../components/Dialog";
import AddClient from "../../components/AddClient";

function ClientList() {
  const dispatch = useDispatch<AppStore>();

  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const pageNumber = useSelector<AppState, number>(getPageNumber);
  const totalCount = useSelector<AppState, number>(getTotalCount);
  const pageLimit = useSelector<AppState, number>(getPageLimit);
  const clientsList = useSelector<AppState, Array<{[key: string]: string}>>(getClients);

  const showNewClientDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleLoadMore = () => {
    dispatch(incrementPageNumber());
  }

  const fetchClients = () => {
    startTransition(() => {
      dispatch(fetchClientsList({ page: pageNumber, limit: pageLimit }));
    });
  };

  useEffect(() => {
    fetchClients();
  }, [pageNumber]);

  

  return (
    <div className="mx-0 w-100 vh-100 my-2 container">
      <div className="row">
        <h1 className="text-center">Web Scraper</h1>
      </div>
      <div className="row justify-content-end">
        <button
          className="w-auto btn btn-success mx-4"
          onClick={() => {
            showNewClientDialog();
          }}
        >
          Add New Client
        </button>
      </div>
      <div className="row my-2 gy-4 pb-4">
        {clientsList.map((client: { [key: string]: string }) => (
          <div className="fluid col-xs-6 col-md-4" key={client.uuid}>
            <ClientDetails client={client} />
          </div>
        ))}
      </div>
      {clientsList.length < totalCount && (
        <div className="row py-4 justify-content-center">
          <button onClick={() => {handleLoadMore();}} className="w-auto btn btn-warning px-4"> Load More</button>
        </div>
      )}
      {isPending && <Loader />}
      {showDialog && (
        <Dialog
          title="Add New Client"
          show={showDialog}
          handleClose={closeDialog}
        >
          <AddClient />
        </Dialog>
      )}
    </div>
  );
}

export default ClientList;
