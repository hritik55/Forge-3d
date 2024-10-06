export const labels = async (language: string) => {
  switch (language) {
    case "es-la":
      return (await import("./locales/es-la")).default;
    case "zh":
      return (await import("./locales/zh")).default;
    case "heb":
      return (await import("./locales/heb")).default;
    case "en-us":
    default:
      return (await import("./locales/en-us")).default;
  }
};
