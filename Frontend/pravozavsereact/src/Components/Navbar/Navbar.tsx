import React from 'react'; 
import { Button, Container, Modal, Nav, Navbar as NavbarBootstrap} from "react-bootstrap"
import { NavLink, Router } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

export default function Navbar() {
    const items = [
        {
            label: 'Domov',
            icon: 'pi pi-fw pi-power-off'
        },
        {
            label: 'Zastavi vprašanje',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    )
}