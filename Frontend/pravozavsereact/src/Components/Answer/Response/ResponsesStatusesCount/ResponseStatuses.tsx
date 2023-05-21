import React from "react";
import { Response, Status } from "../../../../Modules/Interfaces/Answer";
import { Tag } from "primereact/tag";

interface ResponsesProps {
  responses: Response[];
}

const numberOfResponsesOfStatus = (responses: Response[], wantedStatus: Status): number => {
  return responses.filter((response)=>(response.status===wantedStatus)).length;
}

export default function ResponsesStatusesCount(props: ResponsesProps): JSX.Element {
  const goodResponses = numberOfResponsesOfStatus(props.responses, Status.Good);
  const badResponses = numberOfResponsesOfStatus(props.responses, Status.Bad);
  const veryBadResponses = numberOfResponsesOfStatus(props.responses, Status.VeryBad);

  return (
    <>
      {goodResponses+badResponses+veryBadResponses===0 && <i>Ni odzivov</i>}
      {goodResponses!==0 && <Tag icon="pi pi-thumbs-up" severity="success" value={goodResponses} rounded style={{marginRight: '0.1em', marginLeft: '0.1em'}} />}
      {badResponses!==0 && <Tag icon="pi pi-thumbs-down" severity="warning" value={badResponses} rounded style={{marginRight: '0.1em', marginLeft: '0.1em'}} />}
      {veryBadResponses!==0 && <Tag icon="pi pi-thumbs-down" severity="danger" value={veryBadResponses} rounded style={{marginRight: '0.1em', marginLeft: '0.1em'}} />}
    </>
  );
}

