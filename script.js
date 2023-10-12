console.log('%c ÚKOL 1: Kontrola datumu ', 'background:black;color:pink;');

/*Napište funkci `jeValidniDatum`, která zkontroluje správnost zadaného datumu. Funkce bude přijímat datum jako parametr ve formě textového 
řetězce ve formátu `'DD.MM.YYYY'` (den, měsíc, rok).

Můžete předpokládat, že textový řetězec bude vždy v tomto tvaru a žádném jiném. 
Nemusíme tedy řešit, zda v textu chybí tečka nebo zda místo čísla nemáme písmeno. Zatím předpokládejme, že vše bude zadané ve správném tvaru.

**Ale čísla uvnitř mohou být špatně.** Tj. může být zadaný 13. měsíc v roce, nebo 47. den v měsíci, nebo rok mimo námi povolený rozsah.

Ve funkci si rozdělte přijatý textový řetězec do 3 proměnných pro `mesic`, `den` a `rok`.

Funkce vrátí `true` nebo `false` podle toho, zda se jedná o validní datum.

Za validní datum považujeme:

- rok je mezi 1900 - 2100
- měsíc je 1 - 12
- měsíc má správný počet dní
- nezapomeňte, že v přestupných letech má únor 29 dní - pro kontrolu, zda je rok přestupný, použijte funkci `jePrestupnyRok` ze cvičení na funkce.


Ověřte, že vše správně funguje na různých datumech, např.:

console.log( jeValidniDatum('15.06.2023') );  // mělo by být true

// špatná data
console.log( jeValidniDatum('57.03.2023') );  // mělo by být false - špatný den
console.log( jeValidniDatum('07.13.2023') );  // mělo by být false - špatný měsíc
console.log( jeValidniDatum('21.09.2123') );  // mělo by být false - "špatný" rok

// únor v přestupném  a nepřestupném roce
console.log( jeValidniDatum('29.02.2023') );  // mělo by být false - není přestupný
console.log( jeValidniDatum('29.02.2024') );  // mělo by být true - je přestupný


Vyzkoušejte i další vlastní hodnoty.


+ Bonus 2*/


const jeValidniDatum = (datum) => {
    const den = Number(datum.slice(0, 2)); // Oddělí den
    const mesic = Number(datum.slice(3, 5)); // Oddělí měsíc
    const rok = Number(datum.slice(6)); // Oddělí rok
  
    const prestupnyRok = (rok) => {
      return (rok % 4 === 0 && rok % 100 !== 0) || (rok % 400 === 0); // True, pokud je rok dělitelný 4 a zároveň pokud rok není dělitelný 100 ... true, pokud je rok dělitelný 400
    }
  
    if (rok < 1900 ||  rok > 2100) {
      return 'Neplatný rok'; // Vrať Neplatný rok, pokud je číslo mimo rozsah 1900 - 2100

    } else if (mesic < 1 || mesic > 12) {
      return 'Neplatný měsíc'; // Vrať Neplatný měsíc, pokud je číslo mimo rozsah 1 - 12

    } else if (mesic === 2) { // Jedná se o únor?

      if (prestupnyRok(rok)) { // Funkce, zda se jedná o přestupný rok
        if (den < 1 || den > 29) { // Splňuje den rozsah dní v měsíci přestupného roku 1 - 29?
          return 'Neplatný den pro přestupný rok';
        } else {
          return true;
        }

      } else {
        if (den < 1 || den > 28) { // Splňuje den rozsah dní v měsíci 1 - 28?
          return 'Neplatný den pro tento měsíc';
        } else {
          return true;
        }
      }

    } else if ([4, 6, 9, 11].includes(mesic)) { // Kontrola měsíců, které mají 30 dní - 4,6,9,11
      if (den < 1 || den > 30) {
        return 'Neplatný den pro tento měsíc';
      } else {
        return true;
      }

    } else {
      if (den < 1 || den > 31) { // Kontrola všech ostatních měsíců, které mají 31 dní
        return 'Neplatný den pro tento měsíc';
      } else {
        return true;
      }
    }
  }
  
  console.log(jeValidniDatum('25.06.3023')); 

  //console.log(jeValidniDatum('33.11.2023')); = false / Neplatný den pro tento měsíc
  //console.log(jeValidniDatum('22.13.2023'));// = false / Neplatný měsíc
  //console.log(jeValidniDatum('22.03.3003'));// = false / Neplatný rok

  //console.log( jeValidniDatum('29.02.2023') );// = false / Neplatný den pro tento měsíc
  //console.log( jeValidniDatum('29.02.2024') );  = true


  /* Bonus 1

Vytvořte si druhou funkci `pocetDniMesice`, která bude jako parametry přijímat číslo měsíce a rok.
 Na výstupu funkce vrátí, kolik dní má měsíc v tomto roce. */

 const pocetDniMesice = (mesic, rok) => {
    if ([4, 6, 9, 11].includes(mesic)) {  //pokud patří do měsíce 4,6,9,11 - vrátí 30
      return 30;

    } else if ([1, 3, 5, 7, 8, 10, 12].includes(mesic)) {  //pokud patří do měsíce 1,3,5,7,8,10 - vrátí 30
      return 31;

    } else if (mesic === 2) {
      return (rok % 4 === 0 && rok % 100 !== 0) || (rok % 400 === 0) ? 29 : 28;  // pokud je měsíc 2, kontroluje, zda je rok přestupný - pokud ano, vrátí 29 .. - pokud ne, vrátí 28
    }
  }

  console.log(pocetDniMesice(2, 2023));

  //console.log(pocetDniMesice(2, 2024)); = 29
  //console.log(pocetDniMesice(1, 2022)); = 31
  //console.log(pocetDniMesice(6, 1994)); = 30
