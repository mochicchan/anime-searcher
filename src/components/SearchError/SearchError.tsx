import yui from "../../assets/yuishrug.png";

export default function SearchError({ error }: { error: string }) {
  return (
    <>
      <p>Error: {error}</p>
      <img height="200" src={yui} />
    </>
  );
}
