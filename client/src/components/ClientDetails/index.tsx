interface ClientDetailsProps {
  client: { [key: string]: string };
}

function index({ client }: ClientDetailsProps) {
  return (
    <div className="">
      <h4>{client.name}</h4>
    </div>
  );
}

export default index;
