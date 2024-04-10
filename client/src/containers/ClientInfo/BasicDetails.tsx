interface BasicDetailsProps {
  client: { [key: string]: string };
}

function BasicDetails({ client }: BasicDetailsProps) {
  return (
    <div className="row details">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th colSpan={2} className="text-center">
              <h5>Basic Details</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-semibold">Name</td>
            <td>{client?.name}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Registration Date</td>
            <td>{client?.registrationDate}</td>
          </tr>
          <tr>
            <td className="fw-semibold">CIN</td>
            <td>{client?.cin}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Class</td>
            <td>{client?.companyClass}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Category</td>
            <td>{client?.companyCategory}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Sub Category</td>
            <td>{client?.companySubCategory}</td>
          </tr>
          <tr>
            <td className="fw-semibold">ROC</td>
            <td>{client?.roc}</td>
          </tr>
          <tr>
            <td className="fw-semibold">Status</td>
            <td>{client?.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BasicDetails;
