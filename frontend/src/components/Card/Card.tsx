import "./Card.scss";
import lapis from "./lapis.png";
import lixeira from "./lixeira.png";
interface CardProps {
  nome: string;
  descricao: string;
}

function Card(props: CardProps) {
  return (
    <figure className="Card">
      <h1>{props.nome}</h1>
      <p>{props.descricao}</p>
      <div className="flexBotaoCard">
        <button>
          <img src={lapis} />
        </button>
        <button>
          <img src={lixeira} />
        </button>
      </div>
    </figure>
  );
}

export default Card;
