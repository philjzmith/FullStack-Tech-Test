import React from 'react';
import styled from 'styled-components';

interface IDetailsTemplateProps {
  id?: string;
}

const DetailsTemplate: React.FC<IDetailsTemplateProps> = ({
  id
}) => {

  // const loadData = async() => {  

  //   const response = await (await fetch(`http://localhost:3000/api/hello/?page=${currentPage}&name=${character}`, {method: 'GET'})).json()
  //   setData(() => [...data, ...response.data]);

  //   if(!response.info.next && character === 'morty') {
  //     setHasMore(false);
  //     return false;
  //   }

  //   if(!response.info.next && character !== 'morty') {
  //     setCharacter('morty');
  //     setcurrentPage(1);
  //     return false;
  //   }

  //   setcurrentPage(currentPage + 1)
  // }

  return (
    <>
      <Header>
          <h1>Rick and Morty</h1>
      </Header>

      <Wrapper>
     
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
  margin-top: -150px;
`;

export default DetailsTemplate;
