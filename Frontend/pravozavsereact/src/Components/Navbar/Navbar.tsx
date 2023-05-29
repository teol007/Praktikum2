import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import './Navbar.css'
import { useAtom } from 'jotai';
import { userAuthentication } from '../../Atoms/UserAuthentication';
import { Group } from '../../Modules/Interfaces/UserCustomInfo';

const everyoneButtons: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home', target: '/'},
    {label: 'Zastavi vprašanje', icon: 'pi pi-fw pi-question-circle', target: '/zastaviVprasanje'},
    {label: 'Račun', icon: 'pi pi-fw pi-user', target: '/racun'},
    {label: 'Arhiv', icon: 'pi pi-fw pi-user', target: '/arhiv'},
    {label: 'Statistika', icon: 'pi pi-fw pi-chart-line', target: '/statistika/osebnaStatistika'},
];

const onlyAuthorButtons: MenuItem[] = [
    {label: 'Stran za avtorja', icon: 'pi pi-fw pi-user', target: '/avtor'},
];

const onlyManagerButtons: MenuItem[] = [
    {label: 'Stran za urednika', icon: 'pi pi-fw pi-user', target: '/urednik'},
];


export default function Navbar() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();
    const [user] = useAtom(userAuthentication);

    let showedButtons = everyoneButtons;
    if(user && user.group===Group.Author)
        showedButtons = [...showedButtons, ...onlyAuthorButtons];
        
    if(user && user.group===Group.Manager)
        showedButtons = [...showedButtons, ...onlyAuthorButtons, ...onlyManagerButtons];

    useEffect(() => {
        setCurrentPage(everyoneButtons.findIndex((button)=>(button.target==='/'+location.pathname.split('/')[1])));
    }, [location.pathname]);

    const goToPage = (event: TabMenuTabChangeEvent):void => {
        const buttonIndex = event.index;
        const page = event.value.target;
        setCurrentPage(buttonIndex);
        navigate(page ?? '/');
    };

    return (
        <TabMenu model={showedButtons} activeIndex={currentPage} onTabChange={goToPage} className='dynamicResizing' />
    )
}