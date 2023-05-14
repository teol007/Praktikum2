import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

const buttons: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Zastavi vprašanje', icon: 'pi pi-fw pi-question-circle'},
    {label: 'O nas', icon: 'pi pi-fw pi-question-circle'},
    {label: 'Človekove pravice', icon: 'pi pi-fw pi-question-circle'},
    {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
    {label: 'Documentation', icon: 'pi pi-fw pi-file'},
    {label: 'Settings', icon: 'pi pi-fw pi-cog'},
    
];

const pages: string[] = [
    '/', '/zastaviVprasanje', '/aboutUs', '/humanRights'
];

export default function Navbar() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();

    const goToPage = (event: TabMenuTabChangeEvent):void => {
        const buttonIndex = event.index;
        setCurrentPage(buttonIndex);
        navigate(pages[buttonIndex]);
    };

    return (
        <TabMenu model={buttons} activeIndex={currentPage} onTabChange={goToPage}/>
    )
}