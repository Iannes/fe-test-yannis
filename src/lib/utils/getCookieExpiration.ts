export const getCookieExpiration = (numberOfMinutes: number): Date => {
  const expirationDate = new Date(
    new Date().getTime() + numberOfMinutes * 60 * 1000
  );

  return expirationDate;
};
