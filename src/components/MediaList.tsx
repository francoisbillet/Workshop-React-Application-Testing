import {FC} from "react";

interface Props {
    title: string
}

export const MediaList: FC<Props> = ({title}) => {
    return (
        <div>{title}</div>
    )
}