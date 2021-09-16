import { NextApiRequest, NextApiResponse } from "next";

const helloHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: LickApi.IApiResponse = await getData(
    "https://rickandmortyapi.com/api/character?name=rick&status=alive"
  );

  const returnData: LickApi.ICharacter[] = await mapData(data.results);

  res.status(200).json({ info: data.info, data: returnData });
};

export default helloHandler;

export const mapData = async (
  data: LickApi.ICharacterApiResponse[]
): Promise<LickApi.ICharacter[]> => {
  return Promise.all(
    data.map(async (d) => {
      const originMap: LickApi.ILocation = await getLocationData(d.origin);
      const locationDataMap: LickApi.ILocation = await getLocationData(
        d.location
      );
      const episodes: LickApi.IEpisode[] = await getEpisodeData(d.episode);

      return {
        avatar: d.image,
        gender: d.gender,
        id: d.id,
        name: d.name,
        species: d.species,
        origin: originMap,
        location: locationDataMap,
        episodes: episodes,
      } as LickApi.ICharacter;
    })
  );
};

export const getData = async (url: string): Promise<any> => {
  if (!url || url === "") {
    return false;
  }

  const options: RequestInit = {
    method: "GET",
  };

  const response = await fetch(url, options);

  return response.json();
};

export const getLocationData = async (
  apiData: LickApi.ILocationAPIResponse
): Promise<LickApi.ILocation> => {
  const locationData = await getData(apiData.url);

  return {
    dimension: locationData.dimension,
    id: locationData.id,
    name: locationData.name,
    type: locationData.type,
    noOfResidents: locationData.residents ? locationData.residents.length : 0,
  };
};

export const getEpisodeData = async (
  apiEpisodes: string[]
): Promise<LickApi.IEpisode[]> => {
  return Promise.all(
    apiEpisodes.map(async (episode: string) => {
      const episodeData = await getData(episode);

      return {
        airDate: episodeData.air_date,
        episode: episodeData.episode,
        id: episodeData.id,
        name: episodeData.name,
        noOfCharacters: episodeData.characters
          ? episodeData.characters.length
          : 0,
      };
    })
  );
};
