import { Link } from "react-router-dom";

interface ClientDetailsProps {
  client: { [key: string]: string };
}

function ClientDetails({ client }: ClientDetailsProps) {
  const renderField = (text: string, value: string) => {
    return (
      <div>
        <span className="fw-bold">{text}: </span>
        <span className="fw-semibold">{value}</span>
      </div>
    );
  };

  return (
    <div className="container px-2 py-2 bg-light border border-2 rounded clientdetails">
      <a
        href={`/${client.uuid}`}
        className="link-underline link-underline-opacity-0"
      >
        <h6 className="companytitle">{client.name}</h6>
      </a>
      <div className="mt-2"></div>
      {renderField("CIN", client.cin)}
      {renderField("Registered On", client.registrationDate)}
      {renderField("ROC", client.roc)}
      {renderField("Status", client.status)}
      <div className="mt-2"></div>
      <div className="row justify-content-end">
        <Link
          to={`/${client.uuid}`}
          target="_blank"
          className="w-auto btn btn-secondary mx-4"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

export default ClientDetails;
