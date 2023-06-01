import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Config/Firebase";
import { UserCustomInfo } from "../../../Modules/Interfaces/UserCustomInfo";
import { Chip } from "primereact/chip";
import { InputText } from "primereact/inputtext";

export interface EditAccountProps {
  user: UserCustomInfo;
}

export default function EditAccount(props: EditAccountProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState<string>(props.user.fullName);
  const [title, setTitle] = useState<string>(props.user.academicTitle);


  const saveChanges = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      const userDocRef = doc(db, "Users", props.user.uid);
      await updateDoc(userDocRef, { fullName: name, academicTitle: title});
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="flex justify-content-center">
        <Button
          label="Uredi račun"
          icon="pi pi-external-link"
          className="p-button p-button-outlined p-button-primary"
          size="small"
          onClick={handleClick}
          style={{ margin: "10px", padding: "10px" }}
        />
        <Dialog
          header="Uredi svoje podatke"
          visible={visible}
          style={{ width: "90vw" }}
          onHide={() => setVisible(false)}
          blockScroll={true}
        >
          <p>
            <b>Ime in priimek:</b>
            <InputText value={name} onChange={(e) => setName(e.target.value)} />
          </p>
          <p>
            <b>Naziv:</b>
            <InputText value={title} onChange={(e) => setTitle(e.target.value)} />
          </p>
          <p>
            <b>Email:</b> 
            <InputText value={props.user.email} onChange={(e) => setTitle(e.target.value)} disabled />
          </p>
          <p>
            <b>Vloga:</b>
            <InputText value={props.user.group} onChange={(e) => setTitle(e.target.value)} disabled />
          </p>
          <div style={{ marginBottom: "1em" }}>
            <b>Pravna področja: </b>
            {props.user.lawFields.map((field, index) => (
              <React.Fragment key={index}>
                <Chip label={field} style={{ display: "inline-block" }} />
              </React.Fragment>
            ))}
          </div>

          <Button label="Potrdi" icon="pi pi-check" onClick={saveChanges} autoFocus />
        </Dialog>
      </div>
    </>
  );
}
