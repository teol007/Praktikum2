import { Button } from "primereact/button";
import React from "react";
import { AnswerWithId } from "../../../../Modules/Interfaces/Answer";

interface DownloadButtonProps {
    answer: AnswerWithId;
    style?: React.CSSProperties;
    withButtonBackground?: boolean;
}

/**
 * style?: React.CSSProperties, withButtonBackground?: boolean
 * @param props
 * @returns Button, when clicked downloads answer file
 */
export default function FileDownloadButton(props: DownloadButtonProps): JSX.Element {
  return (
    <>
      <a href={props.answer.fileUrl} download target='_blank' rel="noreferrer">
        <Button onClick={undefined} icon={'pi pi-file'} style={props.style ?? {width: '1em', height: '1em'}} text={!(props.withButtonBackground===true)} />
      </a>
    </>
  );
}

