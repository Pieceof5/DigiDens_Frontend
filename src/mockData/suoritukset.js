export const suoritukset = [
  {
    opiskelijaId: 1,   // oppilas
    korttiId: 1,       // suoritekortti
    suoritetutRivit: [1, 2], // listaus rivien id:stä, jotka on suoritettu
  },
  {
    opiskelijaId: 2,
    korttiId: 1,
    suoritetutRivit: [1], // vain ensimmäinen tehtävä suoritettu
  },
];

/*Frontendissä voit tarkistaa:
   const onSuoritettu = suoritukset.find(s => s.opiskelijaId === opiskelija.id && s.korttiId === kortti.id)
  ?.suoritetutRivit.includes(rivi.id);
*/