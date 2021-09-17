import React from 'react';
import Link from 'next/link'

interface ICardProps {
  name: string;
  gender: string;
  species: string;
  id: string;
  avatar: string;
}

const Card: React.FunctionComponent<ICardProps> = (props: ICardProps) => {
  return (
   <div className="card">
     <div className="card-container">
      <div className="card-image" style={{backgroundImage: `url(${props.avatar})`  }}>

      </div>
      <div className="card-content">
        Name: {props.name} <br />
        Gender: {props.gender} <br />
        Species: {props.species}
      </div>
      <Link href={`/${props.id}`}>
        <a className="card-link">View Profile</a>
      </Link>
     </div>
   </div>
  );
};

export default Card;


