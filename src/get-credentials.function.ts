const getCredentials = async (): Promise<{
  login: string;
  password: string;
}> => ({
  login: String(process.env.USER_LOGIN),
  password: String(process.env.USER_PASSWORD),
});

export { getCredentials };
