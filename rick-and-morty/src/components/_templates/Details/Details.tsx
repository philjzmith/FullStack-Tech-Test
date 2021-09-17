import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link'

interface IDetailsTemplateProps {
  id?: string;
}

const DetailsTemplate: React.FC<IDetailsTemplateProps> = ({
  id
}) => {
  const [data, setData] = useState<LickApi.ICharacter>();

  const loadData = async() => {  
    const response: LickApi.ICharacter = await (await fetch(`http://localhost:3000/api/character/${id}`, {method: 'GET'})).json()
    setData(() => response);
  }

  useEffect(() => {
    loadData();
  })

  return (
    <>
      {data ? (
        <>
          <Header className="header">
              <HeaderContiner>
              <h1>Rick and Morty</h1>
              <Link href="/"><a>&#60; Back to Character list</a></Link>
            </HeaderContiner>
          </Header>

          <Wrapper className="wrapper">
            <div className="details">
              <div className="details-image" style={{ backgroundImage: `url(${data.avatar })`}}></div>
              <div className="details-content">
                <h2 className="details-name">Name: {data.name}</h2>
                <div className="details-status">Status: {data.status}</div>
                {data.origin ? (<div className="details-origin">Origin: {data.origin.name}</div>) : ''}
              </div>
            </div>

            <div className="content">
              {data.location ? (
                <>
                  <h3>Location Details:</h3>
                  <p>Name: {data.location.name}</p>
                  <p>Type: {data.location.type}</p>
                  <p>Dimension: {data.location.dimension}</p>
                  <p>No of Residents: {data.location.noOfResidents}</p>
                </>
              ): ''}

              {data.episodes ? (
                <>
                  <h3>Episodes: {data.episodes.length}</h3>
                  <p>First appearance: {data.episodes[0].name} - {data.episodes[0].episode}</p>
                  <p>First appearance air date: {data.episodes[0].airDate}</p>
                  <p>First appearance character count: {data.episodes[0].noOfCharacters}</p>

                  <p>Last appearance: {data.episodes[data.episodes.length-1].name} - {data.episodes[0].episode}</p>
                  <p>Last appearance air date: {data.episodes[data.episodes.length-1].airDate}</p>
                  <p>Last appearance character count: {data.episodes[data.episodes.length-1].noOfCharacters}</p>
                </>
              ): ''}
            </div>
          </Wrapper>
        </>
      ) : ''}  
    </>
  );
};


const Header = styled.div`
  background-color: #00B0C8;
  text-align: left;
  padding: 100px 0 200px 0;
`;

const HeaderContiner = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  margin-top: -150px;
`;

export default DetailsTemplate;
