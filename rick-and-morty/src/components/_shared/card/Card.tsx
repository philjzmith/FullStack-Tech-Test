import React from 'react';

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
      <a href="" className="card-link">View Profile</a>
     </div>
   </div>
  );
};

export default Card;


