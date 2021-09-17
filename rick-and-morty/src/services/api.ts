export const mapData = async (
  data: LickApi.ICharacterApiResponse
): Promise<LickApi.ICharacter> => {
  const originMap: LickApi.ILocation = await getLocationData(data.origin);
  const locationDataMap: LickApi.ILocation = await getLocationData(
    data.location
  );
  const episodes: LickApi.IEpisode[] = await getEpisodeData(data.episode);

  return {
    avatar: data.image,
    gender: data.gender,
    id: data.id,
    name: data.name,
    species: data.species,
    origin: originMap,
    location: locationDataMap,
    episodes: episodes,
    status: data.status,
  } as LickApi.ICharacter;
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
