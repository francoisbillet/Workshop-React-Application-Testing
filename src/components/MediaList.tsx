import { FC } from "react";
export interface Media {
  title: string;
  releaseDate: string;
  imgUrl: string;
}
interface Props {
  title: string;
  medias: Media[];
}

export const MediaList: FC<Props> = ({ title, medias }) => {
  return (
    <div>
      <span>{title}</span>
      <ul>
        {medias.map((media) => (
          <li key={media.title}>
            <div>
              <img src={media.imgUrl} alt={media.title} />
            </div>
            <span>{media.title}</span>
            <span>{media.releaseDate}</span>
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
};
