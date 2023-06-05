import React from "react";
import { Steps } from 'primereact/steps';
import { MenuItem } from 'primereact/menuitem';
import { useNavigate } from "react-router";

interface ProgressBarProps {
    activeIndex: number;
}

export default function ProgressBar(props: ProgressBarProps): JSX.Element {
    const navigate = useNavigate();
    const items: MenuItem[] = [
        {
            label: 'Napiši odgovor',
            command: () =>{
                navigate("/avtor");
            }
        },
        {
            label: 'Komentiraj odgovor',
            command: () =>{
                navigate("/avtor/ocenaOdgovorov");
            }
        }
    ];
  return (
    <>
        <div>
            <Steps model={items} activeIndex={props.activeIndex} readOnly={false} />
        </div>
    </>
  );
}

