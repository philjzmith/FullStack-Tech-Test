import React, { useEffect, useState } from 'react';
import Card from '@lick/components/shared/Card';
import styled from 'styled-components';
import InfiniteScroll from "react-infinite-scroll-component";

interface IHomeTemplateProps {
  className?: string;
}

const HomeTemplate: React.FC<IHomeTemplateProps> = ({
  className
}) => {

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const [character, setCharacter] = useState('rick');

  useEffect(() => {
    loadData();
  }, []);


  const loadData = async() => {  

    const response = await (await fetch(`http://localhost:3000/api/character/?page=${currentPage}&name=${character}`, {method: 'GET'})).json()
    setData(() => [...data, ...response.data]);

    if(!response.info.next && character === 'morty') {
      setHasMore(false);
      return false;
    }

    if(!response.info.next && character !== 'morty') {
      setCharacter('morty');
      setcurrentPage(1);
      return false;
    }

    setcurrentPage(currentPage + 1)
  }

  return (
    <>
      <Header>
          <h1>Rick and Morty</h1>
      </Header>

      <Wrapper className={className}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadData}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <div className="card-row">
            {data ? data.map((d, i) => (
              <Card key={i} name={d.name} gender={d.gender} species={d.species} id={d.id} avatar={d.avatar}></Card>
            )) : ''}
          </div>
        </InfiniteScroll>
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

export default HomeTemplate;
