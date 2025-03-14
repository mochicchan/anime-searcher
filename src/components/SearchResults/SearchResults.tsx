export default function SearchResults({
  title,
  id,
  description,
  image,
  format,
  service,
}: {
  title: string;
  id: string | number;
  description: string;
  image: string;
  format: string;
  service: "anilist" | "kitsu";
}) {
  const url =
    service === "anilist"
      ? `"https://anilist.co/anime"`
      : service === "kitsu"
      ? `"https://kitsu.app/anime"`
      : undefined;

  return (
    <>
      <a href={`${url}/${id}`}>
        <div>
          <p>{title}</p>
          <p>{format}</p>
          <p>{description}</p>
          <img src={image} />
        </div>
      </a>
    </>
  );
}
