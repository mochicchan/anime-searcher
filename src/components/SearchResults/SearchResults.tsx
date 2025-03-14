import style from "./SearchResults.module.css";

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
        <div className={style.Results}>
          <p className={style.ResultsTitle}>{title}</p>
          <p className={style.ResultsFormat}>{format}</p>
          <p className={style.ResultsDescription}>{description}</p>
          <img className={style.ResultsImg} src={image} />
        </div>
      </a>
    </>
  );
}
