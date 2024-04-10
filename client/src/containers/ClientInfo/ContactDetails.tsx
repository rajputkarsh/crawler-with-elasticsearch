interface ContactDetailsProps {
  client: { [key: string]: string };
}

function ContactDetails({ client }: ContactDetailsProps) {
  return (
    <div className="row details">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th colSpan={2} className="text-center">
              <h5>Contact Details</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">Email</td>
            <td>{client?.email}</td>
          </tr>
          <tr>
            <td className="fw-semibold">State</td>
            <td>{client?.state}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Address</td>
            <td>{client?.address}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Pin Code</td>
            <td>{client?.pin}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactDetails;
