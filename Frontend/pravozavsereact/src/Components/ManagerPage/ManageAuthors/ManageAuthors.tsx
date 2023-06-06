import { useAtom } from "jotai";
import React from "react";
import { usersDBAtom } from "../../../Atoms/UsersDBAtom";
import { Card } from "primereact/card";
import { Chip } from "primereact/chip";
import EditAuthorsAccount from "./EditAuthorsAcconut/EditAuthorsAccount";
import { userGroupToSlovenian } from "../../../Modules/Functions/UserGroupTranslate";
import { toSlovenianDate } from "../../../Modules/Functions/DateConverters";

export default function ManageAuthors(): JSX.Element {
    const [users] = useAtom(usersDBAtom);
  
    //const authorUsers = users.filter((user) => user.group === 'Author');
  
    return (
      <div className="container">
        <h2 style={{ marginTop: '1em' }}>Upravljanje uporabnikov</h2>
        <div className="row">
        {users.map((user) => (
            <div className="col flex justify-content-center " style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <Card key={user.uid} title={user.fullName} footer={<EditAuthorsAccount user={user} />} className="md:w-25rem" >
                <p><b>Ime in priimek: </b> {user.fullName}</p>
                <p><b>Naziv: </b> {user.academicTitle!=='' ? user.academicTitle : <i>/</i>}</p>
                <p><b>Email: </b> {user.email}</p>
                <p><b>Vloga: </b> {userGroupToSlovenian(user.group)}</p>
                {user.inactive && (
                    <p>
                        <b>Neaktivnost: </b>
                        {user.inactive.from && user.inactive.to
                        ? `Od ${toSlovenianDate(user.inactive.from.toDate())} do ${toSlovenianDate(user.inactive.to.toDate())}`
                        : null}
                    </p>
                )}
                <div style={{marginBottom: '1em'}}><b>Pravna področja: </b>
                {user.lawFields.map((field, index) => (
                    <React.Fragment key={index}>
                    <Chip label={field} style={{ display: 'inline-block' }} />
                    </React.Fragment>
                ))}
                </div>
          </Card>
          </div>
        ))}
      </div>
      </div>
    );
  }
  