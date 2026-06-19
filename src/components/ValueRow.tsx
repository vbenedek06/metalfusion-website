import './ValueRow.css';

const values = [
  {
    title: 'Precizitás',
    text: 'Szoros tűréseket tartó megmunkálás és gondos minőségellenőrzés minden darabnál.',
  },
  {
    title: 'Megbízhatóság',
    text: 'Kötött határidők, kiszámítható ütemezés, dokumentált gyártási folyamat.',
  },
  {
    title: 'Rugalmasság',
    text: 'Egyedi darabtól a sorozatgyártásig, gyors átfutás és személyes egyeztetés.',
  },
  {
    title: 'Tapasztalat',
    text: 'Több mint másfél évtizedes szakmai háttér, számos iparágban szerzett tudás.',
  },
];

export default function ValueRow() {
  return (
    <section className="values section--tight">
      <div className="container">
        <div className="values__grid">
          {values.map((v, i) => (
            <div className="values__item" key={v.title}>
              <span className="values__num">0{i + 1}</span>
              <h3 className="values__title">{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
