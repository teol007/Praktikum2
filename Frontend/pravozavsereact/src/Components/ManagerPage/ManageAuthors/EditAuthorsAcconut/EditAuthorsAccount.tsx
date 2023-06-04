import { doc, updateDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../../Config/Firebase";
import { UserCustomInfo } from "../../../../Modules/Interfaces/UserCustomInfo";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Chip } from "primereact/chip";
import { MultiSelect } from "primereact/multiselect";

export interface EditAuthorsAccountProps {
  user: UserCustomInfo;
}

export default function EditAuthorsAccount(props: EditAuthorsAccountProps): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState<string>(props.user.fullName ?? "");
  const [title, setTitle] = useState<string>(props.user.academicTitle ?? "");
  const [email, setEmail] = useState<string>(props.user.email ?? "");
  const [group, setGroup] = useState<string>(props.user.group ?? "");
  const [inactive, setInactive] = useState<Date[] | null>();
  const [lawFields, setLawFields] = useState<string[]>(props.user.lawFields ?? []);

  const saveChanges = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const userDocRef = doc(db, "Users", props.user.uid);
      await updateDoc(userDocRef, {
        fullName: name,
        academicTitle: title.includes("/") ? "" : title,
        email: email,
        group: group,
        lawFields: lawFields,
        inactive: {
          from: inactive ? Timestamp.fromDate(inactive[0]) : null,
          to: inactive ? Timestamp.fromDate(inactive[1]) : null,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setVisible(false);
  };

  const handleClick = () => {
    setVisible(true);
  };

  const lawFieldsArray = [
    'Stvarno pravo', 'Kazensko pravo', 'Prekrškovno pravo', 'Obligacijsko pravo', 'Odškodnina',
    'Delovno pravo', 'Socialno pravo', 'Družinsko pravo', 'Dedno pravo', 'Izvršilno pravo', 'Stečaj', 'Davčno pravo', 'Drugo'
  ];

  const handleLawFieldChange = (event: { value: string[] }) => {
    setLawFields(event.value);
  };


  return (
    <>
      <div className="flex justify-content-center">
        <Button label="Uredi račun" icon="pi pi-external-link" className="p-button p-button p-button-primary" size="small" onClick={handleClick} style={{ margin: "10px", padding: "10px" }} />
        <Dialog header="Uredi podatke o avtorju"  visible={visible}  style={{ width: "90vw" }} onHide={() => setVisible(false)} blockScroll={true} >
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
            <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
          </p>
          <p>
            <b>Vloga:</b>
            <Dropdown value={group} onChange={(e) => setGroup(e.value)} options={[ { value: "Author", label: "Avtor" },  { value: "Manager", label: "Urednik" },]} placeholder="Določi vlogo" className="w-full md:w-14rem" />
          </p>
          <p>
            <b>Neaktiven:</b>
            <Calendar value={inactive}  onChange={(e) => setInactive(e.value as Date[])} selectionMode="range" showIcon readOnlyInput />
          </p>

          <div style={{ marginBottom: "1em" }}>
            <b>Pravna področja: </b>
            {props.user.lawFields.map((field, index) => (
              <React.Fragment key={index}>
                <Chip label={field} style={{ display: "inline-block" }} />
              </React.Fragment>
            ))}
            <MultiSelect filter id="lawFieldSelect" value={lawFields} options={lawFieldsArray.map(field => ({ label: field, value: field }))} onChange={handleLawFieldChange} placeholder="Izberite področja" style={{margin:"20px"}} />
          </div>
          <Button label="Potrdi" icon="pi pi-check" onClick={saveChanges} autoFocus />
        </Dialog>
      </div>
    </>
  );
}
