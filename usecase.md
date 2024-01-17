# Use case

## Selaa äänestyksiä

- Käyttäjät
- Laukaisija: Etusivu
- Esiehto: Verkkosivu on auki
- Jälkiehto: Käyttäjä näkee sovelluksessa olevat äänestykset ja voi selata niitä
- Käyttötapauksen kulku:
    1. Verkkosivu avautuu
    2. Käyttäjälle tarjotaan sovelluksessa olevia äänestyksiä
- Poikkeuksellinen toiminta

## Katso äänestystilanteita

- Käyttäjät
- Laukaisija: Käyttäjä valitsee äänestyksen
- Esiehto: Verkkosivu on auki
- Jälkiehto: Käyttäjä näkee äänestyksen tilanteen
- Käyttötapauksen kulku:
    1. Käyttäjä selaa äänestyksiä ja valitsee yhden
    2. Äänestys avautuu ja käyttäjä näkee äänestyksen tilanteen
- Poikkeuksellinen toiminta

## Äänestä

- Käyttäjät
- Laukaisija: Käyttäjä äänestää
- Esiehto: Käyttäjällä on äänestys auki
- Jälkiehto: Äänestys onnistuu
- Käyttötapauksen kulku:
    1. Käyttäjällä on äänestys auki
    2. Käyttäjä äänestää haluamaansa vaihtoehtoa
    3. Äänestystilanne päivittyy
- Poikkeuksellinen toiminta: Käyttäjä on jo äänestänyt, eikä voi äänestää uudestaan.

## Luo äänestyksiä

- Ylläpitäjät
- Laukaisija: Ylläpitäjä aloittaa äänestyksen
- Esiehto: Ylläpitäjä on kirjautunut sisään
- Jälkiehto: Äänestys lisätään sovellukseen
- Käyttötapauksen kulku:
    1. Ylläpitäjä valitsee äänestyksen luonnin
    2. Ylläpitäjä antaa äänestykselle nimen, kuvauksen ja äänestysvaihtoehdot
    3. Ylläpitäjä julkaisee äänestyksen
    4. Äänestys lisätään ja näkyy käyttäjille
- Poikkeuksellinen toiminta

## Poista äänestyksiä

- Ylläpitäjät
- Laukaisija: Ylläpitäjä haluaa poistaa äänestyksen
- Esiehto: Ylläpitäjä on kirjautunut sisään
- Jälkiehto: Äänestys poistuu
- Käyttötapauksen kulku:
    1. Ylläpitäjä valitsee äänestyksen
    2. Sovellus tarjoaa vaihtoehtoa poistaa äänestyksen
    3. Ylläpitäjä poistaa äänestyksen
    4. Äänestys poistuu ja sitä ei näytetä enää käyttäjille
- Poikkeuksellinen toiminta
