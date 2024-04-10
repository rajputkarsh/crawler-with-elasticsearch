import { useEffect, useTransition } from "react";
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

function ClientInfo() {
  const dispatch = useDispatch<AppStore>();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

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
      <div className="mt-5"></div>
      <BasicDetails client={client} />
      <div className="mt-5"></div>
      <ContactDetails client={client} />
      {isPending && <Loader />}
    </div>
  );
}

export default ClientInfo;
