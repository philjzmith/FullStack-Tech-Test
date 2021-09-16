// Namespaces are not compilable.
// Do not import this file. Or import external dependencies.
// Use like so - const intro: LickApi.IIntro = {...};

/* eslint-disable */
declare namespace LickApi {
  interface IIntro {
    text: string;
  }

  interface IApiResponse {
    info: IApiInfo;
    results: ICharacter[];
  }

  interface IApiInfo {
    count: number;
    pages: number;
    next?: string;
    prev?: number;
  }

  interface ICharacterCore {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    type: string;
    url: string;
    created: Date;
  }

  interface ICharacter extends ICharacterCore {
    origin: ILocation;
    location: ILocation;
    episodes: IEpisode[];
  }

  interface ILocation {
    id: number;
    name: string;
    type: string;
    noOfResidents: number;
    dimension: string;
  }

  interface IEpisode {
    id: number;
    name: string;
    airDate: string;
    noOfCharacters: number;
    episode: string;
  }
}
