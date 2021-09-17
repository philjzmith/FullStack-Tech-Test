import { NextPage } from 'next';
import DetailsTemplate from '@lick/components/templates/Details';
import { useRouter } from 'next/router'
import Meta from '@lick/components/shared/Meta';


const DetailsPage: NextPage = () => {
  const router = useRouter()
  const { pageid } = router.query;

  return <>
    <Meta title="Rick and Morty FE Tech Test" />
    <DetailsTemplate id={typeof pageid === 'string' ? pageid : pageid[0]} />
  </>;
};

export default DetailsPage;
