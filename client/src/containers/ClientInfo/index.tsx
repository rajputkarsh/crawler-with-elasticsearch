import { useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState, AppStore } from "../../redux/store";
import {
  fetchClientById,
  getClientById,
} from "../../redux/store/clients.slice";
import Loader from "../../components/Loader";
import BasicDetails from "./BasicDetails";
import ContactDetails from "./ContactDetails";
import Dialog from "../../components/Dialog";
import DeleteClient from "../../components/DeleteClient";
import AddClient from "../../components/AddClient";

function ClientInfo() {
  const dispatch = useDispatch<AppStore>();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState<boolean>(false);

  const handleShowUpdateDialog = () => {
    setShowUpdateDialog(true);
  };

  const closeUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  const handleShowDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const client = useSelector<AppState, {[key: string]: string}>(getClientById(id));

  const fetchClientInfo = () => {
    startTransition(() => {
      dispatch(fetchClientById({ id }));
    });
  };

  useEffect(() => {
    fetchClientInfo();
  }, []);

  return (
    <div className="mx-0 w-100 vh-100 my-2 container">
      <div className="row">
        <h3 className="text-center mt-2">{client?.name || ""}</h3>
      </div>
      <div className="row justify-content-end gx-2">
        <button
          className="w-auto btn btn-success mx-2"
          onClick={() => {
            handleShowUpdateDialog();
          }}
        >
          Update
        </button>
        <button
          className="w-auto btn btn-danger mx-2"
          onClick={() => {
            handleShowDeleteDialog();
          }}
        >
          Delete
        </button>
      </div>
      <div className="mt-5"></div>
      <BasicDetails client={client} />
      <div className="mt-5"></div>
      <ContactDetails client={client} />
      {isPending && <Loader />}
      {showDeleteDialog && (
        <Dialog
          title="Delete Client"
          show={showDeleteDialog}
          handleClose={closeDeleteDialog}
        >
          <DeleteClient id={id} handleClose={closeDeleteDialog} />
        </Dialog>
      )}
      {showUpdateDialog && (
        <Dialog
          title="Update Client"
          show={showUpdateDialog}
          handleClose={closeUpdateDialog}
        >
          <AddClient id={id} />
        </Dialog>
      )}
    </div>
  );
}

export default ClientInfo;
