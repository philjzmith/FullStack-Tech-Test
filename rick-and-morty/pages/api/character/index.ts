import { NextApiRequest, NextApiResponse } from "next";
import { mapData, getData } from "@lick/services/api";

const characterHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query["page"] ? `&page=${req.query.page}` : "";
  const name = req.query["name"] ? `&name=${req.query.name}` : "";

  let data: LickApi.IApiResponse = await getData(
    `https://rickandmortyapi.com/api/character?status=alive${page}${name}`
  );

  const returnData: LickApi.ICharacter[] = await Promise.all(
    data.results.map((result) => {
      return mapData(result);
    })
  );

  res.status(200).json({ info: data.info, data: returnData });
};

export default characterHandler;
