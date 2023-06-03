import React from "react";
import { Response, Status } from "../../../../Modules/Interfaces/Answer";
import { toSlovenianDate, toSlovenianTime } from "../../../../Modules/Functions/DateConverters";
import { Card } from "primereact/card";
import { useAtom } from "jotai";
import { usersDBAtom } from "../../../../Atoms/UsersDBAtom";
import { Tag } from 'primereact/tag';

interface ResponseProps {
  response: Response;
}

const getSeverity = (status: Status): 'success'|'warning'|'danger'|null => {
  switch (status) {
      case Status.Good: return 'success';
      case Status.Bad: return 'warning';
      case Status.VeryBad: return 'danger';
      default: return null;
  }
};

const getSeverityName = (status: Status): 'Se strinjam'|'Ne strinjam se'|'Močno se ne strinjam'|'Neopredeljeno' => {
  switch (status) {
      case Status.Good: return 'Se strinjam';
      case Status.Bad: return 'Ne strinjam se';
      case Status.VeryBad: return 'Močno se ne strinjam';
      default: return 'Neopredeljeno';
  }
};

export default function DisplayResponse(props: ResponseProps): JSX.Element {
  const [users] = useAtom(usersDBAtom);

  const displayCommenter = (response: Response): JSX.Element => {
    const commenter = users.find((user) => (user.uid===response.commenterUid));
    if(!commenter)
      return <i>Avtor komentarja ni znan</i>;
    return <>{commenter.academicTitle} {commenter.fullName}</>
  }

  const created = (response: Response): JSX.Element => (
    <>{toSlovenianDate(response.created.toDate())} ob {toSlovenianTime(props.response.created.toDate())}</>
  )

  return (
    <Card title={()=>(displayCommenter(props.response))} subTitle={()=>(created(props.response))} header className="md:w-25rem m-2" >
      <Tag value={getSeverityName(props.response.status)} severity={getSeverity(props.response.status)} style={{marginRight: '1em'}} />
      {props.response.description}
    </Card>
  );
}
