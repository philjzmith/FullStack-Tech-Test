import React, { useEffect, useState } from 'react';
import Card from '../../_shared/card';
import styled from 'styled-components';
import Meta from '../../_shared/Meta';

interface IIntroTemplateProps {
  className?: string;
  title: string;
}

const IntroTemplate: React.FC<IIntroTemplateProps> = ({
  className,
  title
}) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);


  const loadData = async() => {
    const response = await (await fetch('http://localhost:3000/api/hello', {method: 'GET'})).json();
    
    setData(response.data);
  }

  return (
    <>
      <Meta title={title} />

      <Header>
          <h1>Rick and Morty</h1>
      </Header>

      <Wrapper className={className}>

      <div className="card-row">
        {data ? data.map((d, i) => (
          <Card key={i} name={d.name} gender={d.gender} species={d.species} id={d.id} avatar={d.avatar}></Card>
        )) : ''}
      </div>
        
     

       
      </Wrapper>
    </>
  );
};


const Header = styled.div`
  background-color: #00B0C8;
  text-align: center;
  padding: 100px 0 200px 0;
`;


const Wrapper = styled.div`
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  text-align: center;
  padding: 40px;
`;

export default IntroTemplate;
