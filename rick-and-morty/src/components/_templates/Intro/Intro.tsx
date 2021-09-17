import React, { useEffect, useState } from 'react';
import Card from '@lick/components/shared/Card';
import styled from 'styled-components';
import Meta from '@lick/components/shared/Meta';
import InfiniteScroll from "react-infinite-scroll-component";

interface IIntroTemplateProps {
  className?: string;
  title: string;
}

const IntroTemplate: React.FC<IIntroTemplateProps> = ({
  className,
  title
}) => {

  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    loadData();
  }, []);


  const loadData = async() => {  

    const response = await (await fetch(`http://localhost:3000/api/hello/?page=${currentPage}`, {method: 'GET'})).json()

    if(!response.info.next) {
      setHasMore(false);
    }
    else {
      setcurrentPage(currentPage + 1)
    }

    setData(() => [...data, ...response.data]);
  }

  return (
    <>
      <Meta title={title} />

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

export default IntroTemplate;
