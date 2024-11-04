import "./cardComponents/index.css";

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export function Card({ title, description, onClick }: CardProps) {
  return (

    <div onClick={onClick} className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button>Open Issues</button>
    </div>
  );
}
