import { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppStore } from "../../redux/store";
import {
  fetchClientsList,
  getClients,
  getPageLimit,
  getPageNumber,
} from "../../redux/store/clients.slice";
import { Container, Row, Col } from "react-bootstrap";
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
      <Container className="mx-0 w-100 vh-100 my-2">
        <Row>
          <h1 className="text-center">Web Scraper</h1>
        </Row>
        <Row className="my-2">
          {
            clientsList.map((client: {[key: string]: string}) => (
              <Col key={client.uuid}>
                <ClientDetails client={client} />
              </Col>
            ))
          }
        </Row>
      </Container>
      {isPending && <Loader />}
    </div>
  );
}

export default ClientList;
