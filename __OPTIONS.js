require("dotenv").config();
const OPTIONS = {
  ROOT_PAGE: "index",
  ANZAHL_FUER_FOOTER_STAEDTE: 24, // ==> Anzahl der Links, für den bereich "Weiter Einsatzgebiete" o.ä.
  STANDARD_ROUTEN: ["datenschutz", "impressum", "blog/kfz-versicherung-wechseln", "blog/kfz-versicherung-kosten"], // ==> Statische Routen, welche immer gleich bleiben. (z.B. Über uns, FAQ, Leistungen usw.)
  KEYWORDS: ["kfz-versicherung-",], // ==> unter welchen KEYWORDS die unterseiten erstellt werden
  UNTERORDNER: "", // ==> Falls im UNTERORDNER View ein weiterer UNTERORDNER existiert
  DOMAIN: process.env.DOMAIN_ENV || "auto-versicher.de", // ==> Domain für die Sitemap
  UPLOAD_DATE: "2023-10-17", // ==> Datum für die Sitemap
  KEYWORD_REVERSE: false, // ==> https://domain.de/keyword-hauptort/ort oder if true https://domain.de/hauptort/keyword-ort
  DYN_LOGO: false,
  DEV_MODE: process.env.DEV_MODE || false,
};

module.exports = OPTIONS;
