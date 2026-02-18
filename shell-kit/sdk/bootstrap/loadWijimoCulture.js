const t = async (a) => {
  switch (a) {
    case "de":
      await import("@mescius/wijmo.cultures/wijmo.culture.de");
      break;
    case "ko":
      await import("@mescius/wijmo.cultures/wijmo.culture.ko");
      break;
    default:
      await import("@mescius/wijmo.cultures/wijmo.culture.en");
  }
};
export {
  t as loadWijmoCulture
};
