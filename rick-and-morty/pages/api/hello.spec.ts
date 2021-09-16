import { getData, getEpisodeData, getLocationData } from "./hello";

const unmockedFetch = global.fetch;

afterEach(() => {
  global.fetch = unmockedFetch;
});

describe("getData", () => {
  it("should return false if the URL is an empty string", async () => {
    const response = await getData("");

    expect(response).toEqual(false);
  });

  it("should return false if the URL is null", async () => {
    const response = await getData(null);

    expect(response).toEqual(false);
  });

  it("should return the data from the api", async () => {
    const testData = [{ data: "something" }];

    mockFetchResponse(testData);

    const actualData = await getData("url");

    const expectedData = testData;

    expect(actualData).toEqual(expectedData);
  });
});

describe("getLocationData", () => {
  it("should map the location data correctly", async () => {
    mockFetchResponse({
      dimension: "dimension",
      id: 1,
      name: "name",
      type: "type",
      residents: [{ testData: "test" }],
    });

    const actual = await getLocationData({ name: "test", url: "testurl" });
    const expected = {
      dimension: "dimension",
      id: 1,
      name: "name",
      type: "type",
      noOfResidents: 1,
    };

    expect(actual).toEqual(expected);
  });

  it("should set noOfResidents to 0 if residents is null", async () => {
    mockFetchResponse({
      dimension: "dimension",
      id: 1,
      name: "name",
      type: "type",
      residents: null,
    });

    const actual = await getLocationData({ name: "test", url: "testurl" });
    const expected = {
      dimension: "dimension",
      id: 1,
      name: "name",
      type: "type",
      noOfResidents: 0,
    };

    expect(actual).toEqual(expected);
  });
});

describe("getEpisodeData", () => {
  it("should map the episode data correctly", async () => {
    const testDate = new Date("2021-09-16T16:59:13.999Z");
    mockFetchResponse({
      air_date: testDate,
      episode: "episode",
      name: "name",
      id: 1,
      characters: [{ testData: "test" }],
    });

    const actual = await getEpisodeData(["url"]);
    const expected = [
      {
        airDate: testDate,
        episode: "episode",
        name: "name",
        id: 1,
        noOfCharacters: 1,
      },
    ];

    expect(actual).toEqual(expected);
  });

  it("should set noOfCharacters to 0 if characters is null", async () => {
    const testDate = new Date("2021-09-16T16:59:13.999Z");
    mockFetchResponse({
      air_date: testDate,
      episode: "episode",
      name: "name",
      id: 1,
      characters: null,
    });

    const actual = await getEpisodeData(["url"]);
    const expected = [
      {
        airDate: testDate,
        episode: "episode",
        name: "name",
        id: 1,
        noOfCharacters: 0,
      },
    ];

    expect(actual).toEqual(expected);
  });
});

const mockFetchResponse = (data: unknown) => {
  global.fetch = () => {
    return Promise.resolve({
      json: () => Promise.resolve(data),
    } as Response);
  };
};
