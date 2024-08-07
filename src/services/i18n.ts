import i18n from "i18next";
import Backend from "i18next-http-backend";

import { experimentSettings } from "../fetchAndParse";


// For deployment to Github pages
if (import.meta.env.BASE_URL === '/PictureNamingTask/') {
  await i18n.use(Backend).init({
    backend: {
      loadPath: "/PictureNamingTask/locales/{{lng}}/{{ns}}.json",
    },
    defaultNS: "translation",
    fallbackLng: "en",
    lng: experimentSettings.language,
    ns: ["translation"],
    preload: ["en", "fr"],
  });
}
else {
  await i18n.use(Backend).init({
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    defaultNS: "translation",
    fallbackLng: "en",
    lng: experimentSettings.language,
    ns: ["translation"],
    preload: ["en", "fr"],
  });
}

await i18n.changeLanguage(i18n.resolvedLanguage);
export default i18n;
