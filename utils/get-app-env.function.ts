interface IAppEnv {
  appUrl: string;
  apiUrl: string;
  user: {
    login: string;
    password: string;
  };
}

const getAppEnv = async (): Promise<IAppEnv> => ({
  appUrl: String(process.env.APP_URL),
  apiUrl: String(process.env.API_URL),
  user: {
    login: String(process.env.USER_LOGIN),
    password: String(process.env.USER_PASSWORD),
  },
});

export { getAppEnv };
export type { IAppEnv };
