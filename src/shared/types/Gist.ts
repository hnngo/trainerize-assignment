export type Gist = {
  id: string;
  owner: {
    avatar_url: string;
  };
  files: {
    [key: string]: unknown;
  };
};
