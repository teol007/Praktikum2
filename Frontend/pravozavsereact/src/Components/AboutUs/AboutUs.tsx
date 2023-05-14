import React from "react";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './AboutUs.css'
import { Divider } from 'primereact/divider';





export default function AboutUS(): JSX.Element {
    const data = [
        { code: 'Osnovni podatki društva:', name: 'Društvo Pravo za VSE, Elektrarniška ulica 8, 2351 Kamnica' },
        { code: 'Predsednik:', name: 'Žiga Cvetko, mag. prav.' },
        { code: 'Podpredsednik:', name: 'Patricija Glavica, dipl. prav. (UN)' },
        { code: 'Tajnik:', name: 'Rok Kuster, dipl. prav. (UN)' },
        { code: 'Blagajnik:', name: 'Jakob Stanič Gruden, dipl. prav. (UN)' },
        { code: 'Urejevalec družbenih omrežij in spletnega portala:', name: 'Patricija Glavica, dipl. prav. (UN)' },
        { code: 'Matična številka:', name: '4060199000' },
        { code: 'Davčna številka:', name: '58270507' },
        { code: 'TRR društva:', name: 'SI56 6100 0000 7134 503, odprt pri DELAVSKI HRANILNICI d.d. LJUBLJANA' },
    ];

    const members = [
        {
          name: "Arapović Dženita",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "marec 2021"
        },
        {
          name: "Beranič Špela",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "marec 2021"
        },
        {
          name: "Beširević Iza",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "marec 2021"
        },
        {
          name: "Cvikl Suzana",
          status: "univerzitetna diplomirana pravnica z opravljenim PDI",
          joined: "februar 2013"
        },
        {
          name: "Čopič Urška",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "marec 2021"
        },
        {
          name: "Delević Valentin",
          status: "diplomirani pravnik (UN), študent magistrskega študija prava",
          joined: "junij 2020"
        },
        {
          name: "Dolenc Jan",
          status: "diplomirani pravnik (UN), študent magistrskega študija prava",
          joined: "junij 2020"
        },
        {
          name: "Furman Maša",
          status: "študentka dodiplomskega študija prava",
          joined: "marec 2021"
        },
        {
          name: "Glavica Patricija",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "junij 2020"
        },
        {
          name: "Hvalec Eva",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "marec 2021"
        },
        {
          name: "Kraljevič Lara",
          status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
          joined: "junij 2020"
        },
        {
          name: "Kreitner Luka",
          status: "diplomirani pravnik (UN), študent magistrskega študija prava",
          joined: "julij 2019"
        },
        {
          name: "Kuster Rok",
          status: "diplomiran pravnik (UN), študent magistrskega študijskega programa",
          joined: "junij 2020"
        },
        {
          name: "Lajlar Lina",
          status: "magistrica prava",
          joined: "junij 2020"
        },
    
        {
            name: "Lep Aljaž",
            status: "magister prava",
            joined: "oktober 2018"
        },
        {
            name: "Osrajnik Ilona",
            status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
            joined: "junij 2020"
        },
        {
            name: "Podgoršek Urša",
            status: "študentka dodiplomskega študija prava",
            joined: "marec 2021"
        },
        {
            name: "Smogavc Barbara",
            status: "magistrica prava",
            joined: "oktober 2018"
        },
        {
            name: "Stanič Gruden Jakob",
            status: "diplomirani pravnik (UN), študent magistrskega študija prava",
            joined: "oktober 2018"
        },
        {
            name: "Šuta Živa",
            status: "diplomirana pravnica (UN), študentka magistrskega študija prava",
            joined: "junij 2020"
        },
        {
            name: "Žilavec Aljaž",
            status: "študent dodiplomskega študija prava",
            joined: "marec 2021"
        }
          
    ]

    const pravnaKlinikaMaribor = [
        {
          name: 'Cvetko Žiga',
          status: 'magister prava',
          joined: 'november 2016'
        },
        {
          name: 'Kosi Hederih Ana',
          status: 'univerzitetna diplomirana pravnica z opravljenim PDI, študentka doktorskega študija prava',
          joined: 'februar 2013'
        },
        {
          name: 'Lep Ana',
          status: 'magistrica prava',
          joined: 'december 2014'
        },
        {
          name: 'Kuster Rok',
          status: 'diplomiran pravnik (UN), študent magistrskega študijskega programa',
          joined: 'junij 2020'
        },
        {
          name: 'Glavica Patricija',
          status: 'diplomirana pravnica (UN), študentka magistrskega študija prava',
          joined: 'junij 2020'
        },
        {
          name: 'Podgoršek Urša',
          status: 'študentka dodiplomskega študija prava',
          joined: 'marec 2021'
        },
        {
          name: 'Žilavec Aljaž',
          status: 'študent dodiplomskega študija prava',
          joined: 'marec 2021'
        }
      ]

      const pravnaKlinikaRavne = [
        {
            name: 'Cvetko Žiga',
            status: 'magister prava',
            joined: 'november 2016'
        },
        {
            name: 'Glavica Patricija',
            status: 'diplomirana pravnica (UN), študentka magistrskega študija prava',
            joined: 'junij 2020'
        }
      ]
      
         
      

    

    return (
        <>
         <div className="card">
            <Accordion activeIndex={0}>
                <AccordionTab header="Podatki društva Pravo za vse">
                <div className="card">
                    <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="code" bodyStyle={{ fontWeight: 'bold' }}></Column>
                        <Column field="name"></Column>
                    </DataTable>
                </div>
                </AccordionTab>
                <AccordionTab header="Društvo">
                <p className="m-0">Pred formalno ustanovitvijo društva v letu 2012, so takrat še študentje, združili svoje moči iz različnih področij z namenom vzpostaviti sistem za zagotavljanje pravne pomoči ljudem. Tako je nastal »Spletni portal Pravo za VSE«. Spletna stran je bila vzpostavljena na brezplačnem Googlovem serverju, preko katerega so ljudje lahko postavili svoje pravno vprašanje ali izpostavili določen pravni problem, dobili pa odgovor spletnega svetovalca na svoj e-poštni naslov.</p>
                <p> Ta način spletnega svetovanja je postajal vse bolj priljubljen med ljudmi, zato so člani spletnega portala 19. decembra 2013 ustanovili Humanitarno društvo Pravo za VSE. Poslanstvo, ki je do tedaj temeljilo zgolj na medsebojnem dogovoru o sodelovanju, je z ustanovitvijo društva pridobilo še dodatni pomen. Društvo je tako postalo pravna oseba zasebnega prava, vse z namenom olajšanja nadaljevanja brezplačnega pravnega svetovanja.</p>
                <p>Februarja 2015 je društvo pristopilo k projektu v sodelovanju z Varuhom človekovih pravic Republike Slovenije pri izvajanju nalog in pooblastil državnega preventivnega mehanizma po določbi 5. člena Zakona o ratifikaciji Opcijskega protokola h Konvenciji proti mučenju in drugim krutim, nečloveškim ali poniževalnim kaznim ali ravnanju, v okviru katerega izvajamo nadzor na krajih odvzema prostosti ter preverjamo ravnanje z osebami, ki jim je bila odvzeta prostost.</p>
                <p>Nato je društvo 17. oktobra 2016 pridobilo status nevladne organizacije v javnem interesu. S tem je bil dosežen eden od glavnih ciljev, skrbeti za večjo blaginjo v družbi, preko nudenja brezplačne pravne pomoči in ozaveščanja o pomembnosti dobrega pravnega znanja med širšo populacijo ljudi.</p>
                <p>V letu 2019 je društvo registriralo tudi svojo znamko in zaščitilo svoj simbol in besedno zvezo »Pravo za vse«, slednja je danes vseslovenski simbol za kvalitetno in popolnoma brezplačno pravno svetovanje.</p>
                <p>Novembra 2020 se je društvo preimenovalo v Društvo Pravo za VSE. Slednje z namenom uskladitve imena društva z registrirano znamko in tako vračanju k prvinam društva, ki so bila zasajena v letu 2012 s spletnim portalom Pravo za VSE. Sprejet je bil tudi nov sodoben statut društva.</p>
                <p>Društvo je s svojimi pravnimi nasveti pomagalo že več kot 10.000 ljudem. Pravni nasveti temeljijo na relevantni zakonodaji, sodni praksi ter stališčih pravne teorije. Ljudem se po najboljših močeh trudimo dati odgovor, ki je kvaliteten, praktičen in predvsem napotilen. V društvu se trudimo, da so odgovori podani najkasneje v 14 dneh od prejema.</p>
                <p>Spletno svetovanje je hitro, enostavno, anonimno in brezplačno, v društvu pa se zavedamo tudi pomembnosti klasičnih oblik pravne pomoči. V ta namen se je leta 2016 ustanovila prva ”pravna klinika”. Trend te oblike svetovanja se je izkazal kot uspešen, zato ima društvo štiri pravne klinike: klinika v Mariboru, klinika v Črenšovcih, klinika v Ravnah na Koroškem in klinika na Ptuju, kjer člani društva nudijo osebno pravno svetovanje. Društvo je vedno pripravljeno na širitev na območja občin, ki so zainteresirana za sodelovanje z nami in na katerih lahko zagotovimo zadostno število pravnih svetovalcev.</p>
                <p>V društvu se zavedamo pomembnosti ozaveščanja ljudi o uporabi in razumevanju prava. Člani društva smo zato dejavni tudi na področju izvedbe pravnih delavnic, izvedbe izobraževanja za študente in diplomante prava, organizacije dobrodelnih dogodkov, pisanja znanstvenih in strokovnih člankov, informiranja o pravnih vprašanjih in pri drugih aktivnostih, na podlagi katerih se bo med ljudmi večalo zaupanje v pravo.</p>
                <p>V okviru našega delovanja je moč opaziti, da se ljudje pogosto znajdejo v različnih pravnih situacijah, v katerih se ob oblici informacij, zakonov in medijev, ki pogosto enostransko predstavijo pravne zagate in rešitve, počutijo izgubljene. Na tej točki pomaga ekipa portala Pravo za vse, ki ljudem daje pravne smernice, predstavi osnovne institute prava, njihove pravice in dolžnosti ter jih v določenih primerih napoti tudi na pristojne institucije. Naše delo nikakor ne nadomešča odvetnikov ali notarjev, saj svetovanje poteka na elementarni ravni, na podlagi katerega se večinoma ljudje sploh odločijo, da bodo obiskali odvetnika oziroma si poiskali tovrstno pomoč za nadaljnje postopanje.</p>

                    
                </AccordionTab>
                <AccordionTab header="Ekipa">
                   <h1>Spletno svetovanje</h1>

                   <div className="row">
                    {members.map((member, index) => (
                        <div key={index} className="col-md-6">
                        <Card title={member.name} className="member-card">
                            <p className="m-0">Status: {member.status}</p>
                            <p className="m-0">Član od: {member.joined}</p>
                        </Card>
                        </div>
                    ))}
                    </div>

                    <Divider />


                    <h1>Pravna klinika – Maribor </h1>

                    <div className="row">
                    {pravnaKlinikaMaribor.map((member, index) => (
                        <div key={index} className="col-md-6">
                        <Card title={member.name} className="member-card">
                            <p className="m-0">Status: {member.status}</p>
                            <p className="m-0">Član od: {member.joined}</p>
                        </Card>
                        </div>
                    ))}
                    </div>

                    <Divider />


                    <h1>Pravna klinika – Ravne na Koroškem</h1>

                    <div className="row">
                    {pravnaKlinikaRavne.map((member, index) => (
                        <div key={index} className="col-md-6">
                        <Card title={member.name} className="member-card">
                            <p className="m-0">Status: {member.status}</p>
                            <p className="m-0">Član od: {member.joined}</p>
                        </Card>
                        </div>
                    ))}
                    </div>

                    <Divider />



                    <h1>V spomin</h1>

                    <Card title="Strgar Andraž" className="member-card">
                        <p className="m-0">Status: magister pravnih znanosti z opravljenim PDI </p>
                        <p className="m-0">Član od: februar 2016 – avgust 2019</p>
                    </Card>
                    
                </AccordionTab>
            </Accordion>
        </div>
        
        </>
    );
}



   

