import { useState, useTransition } from "react";
import Loader from "../Loader";
import { useDispatch } from "react-redux";
import { AppStore } from "../../redux/store";
import { deleteClient } from "../../redux/store/clients.slice";
import { toast } from "react-toastify";

interface DeleteClientProps {
  id: string;
  handleClose: () => void;
}

function DeleteClient({ id, handleClose }: DeleteClientProps) {
  const dispatch = useDispatch<AppStore>();
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    setDisabled(true);
    startTransition(() => {
      dispatch(deleteClient({ id }))
        .then((resp: any) => {
          if (resp?.payload?.status == 200) {
            toast("Client Deleted");
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else {
            toast("Something went wrong");
          }
        })
        .catch((error) => {
          toast("Something went wrong");
        });
    });
  };

  return (
    <div className="container">
      <div className="row text-center">
        <h5 className="fw-semibold">Do you want to delete this Client ?</h5>
        <h6 className="fw-semibold">Alert! This action is irreversible.</h6>
      </div>
      <div className="row mt-4 w-100 justify-content-around gx-4">
        <button
          disabled={isDisabled}
          onClick={() => {
            handleDelete();
          }}
          className="w-auto btn btn-danger px-4"
        >
          Delete
        </button>
        <button
          disabled={isDisabled}
          onClick={() => {
            handleClose();
          }}
          className="w-auto btn btn-warning px-4"
        >
          Close
        </button>
      </div>
      {isPending && <Loader />}
    </div>
  );
}

export default DeleteClient;
