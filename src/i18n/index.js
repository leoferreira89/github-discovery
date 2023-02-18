import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import PTPT from "./locals/pt/pt-pt.json";
import ENGB from "./locals/en/en-gb.json";

const resources = {
    'pt-PT': PTPT,
    'en-GB': ENGB
}

i18n.use(initReactI18next)
.init({
    resources,
    lng: navigator.language,
    interpolation: {
        escapeValue: false
    }
})

export default i18n;
