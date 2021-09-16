import { getData } from "./hello";

const unmockedFetch = global.fetch;

afterEach(() => {
  global.fetch = unmockedFetch;
});

describe("getData", () => {
  it("should return the data from the api", async () => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => Promise.resolve([{ data: "something" }]),
      } as Response);
    };

    const actualData = await getData();

    const expectedData = [{ data: "something" }];

    expect(actualData).toEqual(expectedData);
  });
});
