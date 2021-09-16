import { NextApiRequest, NextApiResponse } from "next";

const helloHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getData();

  console.log(data);
  res.status(200).json(data);
};

export default helloHandler;

export const getData = async (): Promise<LickApi.IApiResponse> => {
  const options: RequestInit = {
    method: "GET",
  };

  const response = await fetch(
    "https://rickandmortyapi.com/api/character",
    options
  );

  return response.json();
};
