import './ValueRow.css';

const values = [
  {
    title: 'Precision',
    text: 'Machining to tight tolerances with careful quality control on every part.',
  },
  {
    title: 'Reliability',
    text: 'Fixed deadlines, predictable scheduling and a documented production process.',
  },
  {
    title: 'Flexibility',
    text: 'From one-off parts to series production, with fast turnaround and direct technical discussion.',
  },
  {
    title: 'Experience',
    text: 'More than a decade and a half of expertise across multiple industrial sectors.',
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
