const getAppBaseUrl = async (): Promise<string> => String(process.env.APP_URL);

export { getAppBaseUrl };
