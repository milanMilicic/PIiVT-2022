# Veb aplikacija za isplatu zarada zaposlenih

Ovo je projekat za ispit iz predmeta Praktikum - Internet i web tehnologije.

Broj indeksa: 2018200791

Ime i prezime: Milan Michael Miličić

Školska godina: 2021/2022

## Projektni zahtev

Aplikacija treba da omogući računovodstvenom osoblju firme da vodi preciznu evidenciju o isplatama zarada zaposlenih i o stavkama koje čine poreze i doprinose koji se odbijaju od bruto plata. Korisnik treba da ima mogućnost da doda novog zaposlenog, da menja postojeće i da arhivira one koji više nisu angažovani u firmi. Za svakog zaposlenog treba omogućiti da se evidentira koliko procenata radnog vremena je angažovan u firmi i prema tome treba obračunavati plate. Proračun zarade se vrši na osnovu evidentiranih radnih sati u toku meseca. Na nivou aplikacije se za svaku kategoriju zaposlenih evidentira bruto iznos cene radnog sata. Svaki zaposleni pripada samo jednoj od kategorija koje korisnik može u aplikaciji da kreira ili izmeni. Treba koristiti pojednostavljenu formulu za proračun iznosa za zdravstveno i socijalno osiguranje, kao i za isplatu poreza na dohodak i stopu doprinosa za PIO, bez uzimanja u obzir platne razrede. Za sve nivoe plata računati isti procenat za porez na dohodak. Za svakog zaposlenog se kreira mesečni obračun plata sa podacima za sve izračunate stavke: iznos poreza, iznos doprinosa za PIO, iznos doprinosa za zdravstveno osiguranje, iznos doprinosa za nezaposlenost (socijalno) osiguranje, kao i podatak o isplaćenoj neto zaradi. Treba za svakog zaposlenog kreirati listić sa ovim podacima koji se izdaje zaposlenom nakon isplate zarade. Svi drugi iznosi doprinosa se objedinjuju u mesečni list i sabiraju. Korisnik treba da ima uvid u ukupan iznos sredstava koji za određeni mesec treba uplatiti na osnovu poreza, na osnovu zdravstvenog, na osnovu PIO i na osnovu socijalnog dohotka, kao i ukupan iznos svih bruto davanja za sve zaposlene koji su aktivni u određenom mesecu. Bruto iznos od kojeg se vrši odbijanje dohodaka se formira za svakog zaposlenog na osnovu broja radnih sati, iznosa satnice za kategoriju zaposlenog i sa uračunatim procentom radnog odnosa za datog zaposlenog. Aplikacija mora da ima kontrolu pristupa, tj. da omogući samo korisnicima koji unesu ispravne parametre za pristup da se prijave. Grafički interfejs veb sajta treba da bude realizovan sa responsive dizajnom.


## Tehnička ograničenja

- Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. Aplikacija mora da bude podeljena u dve nezavisne celine: back-end veb servis (API) i front-end (GUI aplikacija). Sav kôd aplikacije treba da bude organizovan u jednom Git spremištu u okviru korisničkog naloga za ovaj projekat, sa podelom kao u primeru zadatka sa vežbi.
- Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS) i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump strukture baze podataka, eventualno sa inicijalnim podacima, potrebnim za demonstraciju rada projekta.
- Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript koda se pokreće kao Node.js aplikacija, a front-end deo se statički servira sa rute statičkih resursa back-end dela aplikacije i izvršava se na strani klijenta. Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
- Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja). Nije neophodno baviti se izradom posebnog dizajna grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao što je Bootstrap CSS biblioteka. Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).
- Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. Moguća su tri sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem adekvatnih testova ili regularnih izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih šema - Schema za validaciju ili drugim pristupima) i (3) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.
- Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka sa detaljnim opisom svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije delova sistema, gde se vidi veza između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; (4) popis svih aktivnosti koje su podržane kroz aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case dijagrama; kao i (5) sve ostale elemente dokumentacije predviđene uputstvom za izradu dokumentacije po ISO standardu.
- Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem alata za verziranje koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim GitHub ili Bitbucket servisima, jedno spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat da bude otpremljen u samo nekoliko masovnih Git commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, da su korišćene grane (branching), da je bilo paralelnog rada u više grana koje su spojene (merging) sa ili bez konflikata (conflict resolution).


## Baza podataka
/


## Use-Case dijagrami
/

## Uloge:

**Korisnik(administrator)**

    Kategorije:
    - prikazivanje svih kategorija
    - prikazivanje pojedinačne kategorije
    - dodavanje novih kategorija(obavezni podaci za name i hourlyPrice - cena satnice kategorije)
    - ne mogu postojati kategorije sa istim imenom
    - menjanje imena i/ili satnice kategorije

    Zaposleni:
    - prikazivanje svih zaposlenih
    - dodavanje novih zaposlenih kroz kategoriju(obavezni podaci za name i jmbg. Podatak employment nije obavezan i predstavlja radni odnos. Ako korisnik ne definiše podatak employment, po defaultu se definiše da je on 100 pa je tako employment 100 = 100% radni odnos, employemnt 60 = 60% radni odnos itd.)
    - menjanje imena i/ili statusa i/ili radnog odnosa zaposlenog
    - ne mogu postojati zaposleni sa istim jmbg-om
    - ne mogu se menjati podaci zaposlenog ako kategorija kojoj pripada nije odgovarajuća
    - zaposleni može pripadati samo jendoj kategoriji

    Plata:
    - prikazivanje svih plata
    - prikazivanje svih plata za određenu godinu i mesec
    - dodavanje plate za zaposlenog za određenu godinu i mesec(obavezan podatak workHours - broj odrađenih radnih sati za konkretan mesec. Zaposleni ne može imati manje od 8 ili više od 160 radnih sati u mesecu.)
    - ne može se dodati plata za zaposlenog koji nije aktivan
    - ne može se dodati plata za zaposlenog za već postojeći mesec i godinu

    Obračun(Kalkulacija - suma svih troškova za određeni mesec i godinu):
    - prikazivanje svih obračuna
    - prikazivanje svih obračuna za konkretnu godinu
    - prikazivanje svih obračuna za konkretan mesec
    - prikazivanje obračuna za konkretnu godinu i mesec
    - dodavanje(računanje) obračuna(obavezni podaci year i monthId gde je monthId 1 = Januar, monthId 2 = Februar itd.)
    - ne može se dodati obračun za već izračunatu godinu i mesec

    Korisnik:
    - prikazivanje svih korisnika
    - prikazivanje konkretnog korisnika
    - dodavanje novog korisnika(obavezni podaci username i password. Username mora biti dužine između 5 i 32 karaktera i može da sadrži slova, brojeve i simbol "-"(minus). Password mora biti najmanje 6 karaktera i mora sadržati barem jedno veliko slovo i barem jedan broj)
    - menjanje username i/ili passworda uz sve prethodno napisane kriterijume
    - ne mogu postojati dva korisnika sa istim username-om
    - podaci za login korisnika:
        username: noviusername1
        password: Novipassword1

        username: admin1
        password: Password123

    Prilikom login-a, korisnik dobija auth token i refresh token.
    Korisnik može pomoću svog refresh tokena zatražiti generisanje novog auth tokena.
    Auth token traje 24h.
    Refresh token traje 60 dana.   


