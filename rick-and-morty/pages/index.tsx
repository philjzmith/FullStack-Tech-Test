import { NextPage } from 'next';
import HomeTemplate from '@lick/components/templates/Home';
import Meta from '@lick/components/shared/Meta';

const HomePage: NextPage = () => {
  return <>
    <Meta title="Rick and Morty FE Tech Test" />
    <HomeTemplate />
  </>;
};

export default HomePage;
