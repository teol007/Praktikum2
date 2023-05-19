import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import { TabMenu, TabMenuTabChangeEvent } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';

const buttons: MenuItem[] = [
    {label: 'Home', icon: 'pi pi-fw pi-home'},
    {label: 'Zastavi vprašanje', icon: 'pi pi-fw pi-question-circle'},
    {label: 'O\u00A0nas', icon: 'pi pi-fw pi-building'},
    {label: 'Človekove pravice', icon: 'pi pi-fw pi-id-card'},
    {label: 'Račun', icon: 'pi pi-fw pi-user'},
    {label: 'Neodgovorjena vprašanja', icon: 'pi pi-fw pi-comment'},
    {label: 'Stran za urednika', icon: 'pi pi-fw pi-user'},
    {label: 'Stran za avtorja', icon: 'pi pi-fw pi-user'},

];

const pages: string[] = [
    '/', '/zastaviVprasanje', '/oNas', '/clovekovePravice', '/racun', '/vprasanja', '/urednik', '/avtor'
];

export default function Navbar() {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPage(pages.indexOf(location.pathname));
    }, [location.pathname]);

    const goToPage = (event: TabMenuTabChangeEvent):void => {
        const buttonIndex = event.index;
        setCurrentPage(buttonIndex);
        navigate(pages[buttonIndex]);
    };

    return (
        <TabMenu model={buttons} activeIndex={currentPage} onTabChange={goToPage}/>
    )
}