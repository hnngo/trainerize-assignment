import { Gist } from "../types/Gist";

const RESULTS_PER_PAGE = 20;

/**
 * Fetch the mock gists to use for testing purposes if API rate limiting is applied
 * @param {number} page query the page number to fetch, with reference to the results per page. Defaults to page 1.
 * @return {Promise<Array<Gist>>} a promise of an array of object type Gist
 */
const getMockGists = (page: number = 1): Promise<Array<Gist>> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const exampleGist = {
        files: {
          "hello_world.rb": {
            filename: "hello_world.rb",
            type: "application/x-ruby",
            language: "Ruby",
            raw_url:
              "https://gist.githubusercontent.com/octocat/6cad326836d38bd3a7ae/raw/db9c55113504e46fa076e7df3a04ce592e2e86d8/hello_world.rb",
            size: 167
          }
        },
        owner: {
          avatar_url:
            "https://avatars.githubusercontent.com/t/5133850?s=280&v=4"
        }
      };
      const result = Array(RESULTS_PER_PAGE)
        .fill(0)
        .map(() => ({
          ...exampleGist,
          id: "" + (Math.floor(Math.random() * 10000000) * 10 + page)
        }));
      res(result);
    }, 2000);
  });
};

/**
 * Fetches an array of public gists from the public github API.
 * Documentation here: https://docs.github.com/en/rest/gists/gists#list-public-gists
 * @param {number} page query the page number to fetch, with reference to the results per page. Defaults to page 1.
 */
const getGists = (page: number = 1, usingMockApi: boolean = false): Promise<Array<Gist>> => {
  if (usingMockApi) {
    return getMockGists(page);
  }

  return fetch(`https://api.github.com/gists/public?per_page=${RESULTS_PER_PAGE}&page=${page}`).then((response) =>
    response.json()
  );
};

export { getGists, RESULTS_PER_PAGE };
