export type User = {
  id?: number;
  login: string;
  name: string;
  location: string;
  url: string;
  createdAt: Date;
};

export type UserLanguage = {
  id?: number;
  userId: number;
  language: string;
};
