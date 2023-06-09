# Informacijski sistem Pravo za vse

![Logotip Pravo za vse](https://github.com/teol007/Praktikum2/blob/main/_PROMOCIJA/logo-pravozavse.jpg)

## Vizija
Namen IS Pravo za vse je poenostavitev procesa zastavljanja in odgovarjanja na pravna vprašanja. Glavni namen je omogočiti društvu Pravo za vse
lažji pregled nad zastavljenimi vprašanji in avtomatizirati, pohitriti proces odgovarjanja na vprašanja. Vloge, ki nastopajo pri storitvi so:
- stranka: neprijavljen uporabnik, ki postavi pravno vprašanje
- neopredeljen uporabnik: prijavljen uporabnik, ki čaka na odobritev urednika
- avtor: prijavljen uporabnik, član društva Pravo za vse, ki odgovarja na pravna vprašanja in ocenjuje druge odgovore
- urednik: prijavljen uporabnik, član društva Pravo za vse, ki po potrebi skrbi za ročno upravljanje z vprašanji in upravlja z drugimi avtorji (ima pregled
nad vsem, kar ima tudi avtor)

## Dokumentacija vzpostavitve:
- Besednjak:
  - CLI - command-line interface (npr. terminal)

- Vzpostavitev React frontend-a:
  1. Predpogoji:
     - Nameščen NodeJS (v18.14.2)
     - Pridobljen ta git repozitorij na sistem
     - Ustvarjen Firebase račun in firebase projekt
    
  2. Koraki:
     1. Znotraj \Praktikum2\Frontend\pravozavsereact (CLI ukaz): npm install
     2. Pridobi firebase-tools (CLI ukaz): npm install -g firebase-tools
     3. Prijavi se na Firebase znotraj CLI (CLI ukaz): firebase login
        - Če je napaka "firebase.ps1 cannot be loaded because running scripts is disabled on this system." potem samo izbriši datoteko "firebase.ps1" (pot piše zraven) in ponovno izvedi korak 3
     4. Zgradi React kodo v optimiziran produkcijski paket (CLI ukaz): npm run build
        - Pazi, da si res na poti "\Praktikum2\Frontend\pravozavsereact"
     5. Inizicaliziraj Firebase (CLI ukaz): firebase init
        - Pazi, da si res na poti "\Praktikum2\Frontend\pravozavsereact"
        1. Označi možnost (s presledkom (space) in potrdi z enter): "Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys"
        2. Izberi možnost: "Use an existing project"
        3. Izberi svoj Firebase projekt
        4. "What do you want to use as your public directory?" (napiši "build")
        5. "Configure as a single-page app (rewrite all urls to /index.html)?": y
        6. "Set up automatic builds and deploys with GitHub?":
           - Če ne želiš GitHub repozitorija ALI če to ne zaganjaš prvič ALI je repozitorij že bil kdaj povezan: (Vpiši: N)
             1. "File build/404.html already exists. Overwrite?" N
             2. "File build/index.html already exists. Overwrite?" N
             3. [Preskoči naslednji pomišljaj in nadaljuj pri koraku 6]

           - Če to delaš prvič IN HKRATI želiš imeti povezan GitHub repozitorij: (Vpiši: y)
             1. "File public/index.html already exists. Overwrite?": N
             2. "For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository)": (sem samo kopiraj tisti del linka, ki je za "https://github.com/", ko si v svojem GitHub projektu)
             3. Samo klikni enter pri vprašanju: "Set up the workflow to run a build script before every deploy?"
             4. Samo klikni enter pri vprašanju: "Set up automatic deployment to your site's live channel when a PR is merged?"
             5. "What is the name of the GitHub branch associated with your site's live channel?": (vpiši ime Branch znotraj GitHub projekta, iz katere bo avtomatsko nameščeno na Firebase)
     6. Zaženi namestitev na Firebase (CLI ukaz): firebase deploy

- Vzpostavitev Firebase Backend-a:
  1. Predpogoji: 
     - Ustvarjen Firebase račun in firebase projekt
     - Pridobljen ta git repozitorij na sistem
     - Na Firebase projektu izbran paket Blaze (potrebno dati bančno kartico, vendar je vse zastonj, če ne prekoračiš limitov) (drugače Firebase Functions ne bodo delovale)
     - Vzpostavljen SMTP server (priporočena uporaba: https://sendgrid.com/)

  2. Koraki: 
     1. V datoteki "\Praktikum2\Backend\Functions\functions\src\Config\FrontendHostingConf.ts" nastavi spremenljivko "frontendHostingUrl" na URL, kjer je vzpostavljen frontend (React)
     2. Na Firebase projektu (spletni strani) omogoči Firestore Database in Storage
     3. Pod zavihkom "Firestore Database" pojdi na "Rules"
        1. Kopiraj vsebino datoteke "/Backend/Rules/Firebase Firestore rules.txt" v Edit rules vnosno polje
        2. Potrdi spremembe s klikom na "Publish"
     4. Pod zavihkom "Storage" pojdi na "Rules"
        1. Kopiraj vsebino datoteke "/Backend/Rules/Firebase Storage rules.txt" v Edit rules vnosno polje
        2. Potrdi spremembe s klikom na "Publish"
     5. Na Firebase projektu namesti razširitev "Trigger Email from Firestore"
        - Pod "Configure extension" pri nastavitvi "Email documents collection" vpiši: AutoEmails
        - Druge opcijske nastavitve lahko pustiš prazne
     6. Inicializiraj Firebase Functions na poti "Praktikum2\Backend\Functions" (CLI ukaz): firebase init
        - Pazi, da si res na poti "Praktikum2\Backend\Functions"
        1. Označi možnost (s presledkom (space) in potrdi z enter): "Functions: Configure a Cloud Functions directory and its files"
        2. "Please select an option": Use an existing project
        3. "Select a default Firebase project for this directory": (Izberi svoj Firebase projekt)
        4. "What language would you like to use to write Cloud Functions?": TypeScript
        5. Če bo sedaj napisalo, da nekatere datoteke že obstajajo (in Overwrite) pri vsaki napiši: n
        6. "Do you want to use ESLint to catch probable bugs and enforce style?": n
        7. "Do you want to install dependencies with npm now?": Y
     7. Naloži funkcije na Firebase server (CLI ukaz): firebase deploy
