export const formatDate = (date: string, locale: string = "en-US") => {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
};
