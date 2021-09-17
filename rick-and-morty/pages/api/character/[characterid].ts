import { NextApiRequest, NextApiResponse } from "next";
import { mapData, getData } from "@lick/services/api";

const characterHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { characterid } = req.query;

  let data: LickApi.ICharacterApiResponse = await getData(
    `https://rickandmortyapi.com/api/character/${characterid}`
  );

  const returnData: LickApi.ICharacter = await mapData(data);

  res.status(200).json(returnData);
};

export default characterHandler;
