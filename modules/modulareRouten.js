const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//====================================

// options============================
const {
  ANZAHL_FUER_FOOTER_STAEDTE,
  KEYWORDS,
  UNTERORDNER,
  DOMAIN,
  KEYWORD_REVERSE,
} = require("../__OPTIONS");

const SITE_KEY = process.env.SITE_KEY;

//====================================

//costume Modules=====================
const { randomnArr } = require("./randomItem");
const StaedteListe = require("./staedte_liste");
const { hauptortRegex, ortRegex } = require("./regEx");
const { mapBoxApiUrl, geoData, geoShortCode } = require("./geocoding");

//====================================

const modRoutes = (KEYWORD_REVERSE, UNTERORDNER, keyword) => {
  //Datenbankzugriff====================
  const dbLocal = "mongodb://localhost:27017/staedte_liste";
  const dbURL = process.env.DB_URL || dbLocal;

  mongoose
    .connect(dbURL)
    .then(() => console.log("Verbindung ist hergestellt!!!"))
    .catch((err) => {
      console.log("Verbindung ist fehlgeschlagen!!");
      console.log(err);
    });
  //====================================

  if (!KEYWORD_REVERSE) {
    //Unterseiten=========================
    router.get(`/${keyword}:hauptort`, async (req, res) => {
      const { hauptort } = req.params;
      const stadt = await StaedteListe.find({
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      const stadtone = await StaedteListe.findOne({
        ortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      let arr = randomnArr(stadt, ANZAHL_FUER_FOOTER_STAEDTE);
      if (stadtone === null) {
        return res.render("index", { SITE_KEY, DOMAIN });
      }
      if (stadtone !== null) {
        // const mbURL = mapBoxApiUrl(stadtone.hauptortUrl,stadtone.bundeslandUrl);
        const geolocationInvers = [0, 0];
        const short_code = stadtone.short_code;
        if (geolocationInvers != []) {
          const latitude = stadtone.latitude;
          const longitude = stadtone.longitude;
          const geolocation = `${latitude},${longitude}`;
          const geopos = `${latitude};${longitude}`;
          return res.render(`${UNTERORDNER}${keyword}{hauptort}/`, {
            stadtone,
            SITE_KEY,
            DOMAIN,
            arr,
            keyword,
            geolocation,
            short_code,
            geopos,
            latitude,
            longitude,
          });
        }
      }
      return res.render(`${UNTERORDNER}${keyword}{hauptort}/`, {
        stadtone,
        SITE_KEY,
        DOMAIN,
        arr,
        keyword,
      });
    });
    router.get(`/${keyword}:hauptort/:ort/`, async (req, res) => {
      const { hauptort, ort } = req.params;
      const stadt = await StaedteListe.find({
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      const stadtone = await StaedteListe.findOne({
        ortUrl: ort.replace(/[0-9]/g, ""),
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      if (stadtone === null) {
        return res.render("index", { SITE_KEY, DOMAIN });
      }

      let arr = randomnArr(stadt, ANZAHL_FUER_FOOTER_STAEDTE);
      // const mbURL = mapBoxApiUrl(stadtone.ortUrl, stadtone.bundeslandUrl);
      const geolocationInvers = [0, 0];
      const short_code = stadtone.short_code;
      if (geolocationInvers != []) {
        const latitude = stadtone.latitude;
        const longitude = stadtone.longitude;
        const geolocation = `${latitude},${longitude}`;
        const geopos = `${latitude};${longitude}`;
        return res.render(`${UNTERORDNER}${keyword}{hauptort}/{ort}`, {
          stadtone,
          SITE_KEY,
          DOMAIN,
          arr,
          keyword,
          geolocation,
          short_code,
          geopos,
          latitude,
          longitude,
        });
      }
    });
    //====================================
  } else {
    //Unterseiten Umgekehrte Reihenfolge==
    router.get("/:hauptort", async (req, res) => {
      const { hauptort } = req.params;
      const stadt = await StaedteListe.find({
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      const stadtone = await StaedteListe.findOne({
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      if (stadtone === null) {
        return res.render("index", { SITE_KEY, DOMAIN });
      }

      let arr = randomnArr(stadt, ANZAHL_FUER_FOOTER_STAEDTE);
      // const mbURL = mapBoxApiUrl(stadtone.hauptortUrl, stadtone.bundeslandUrl);
      const geolocationInvers = [0, 0];
      const short_code = stadtone.short_code;
      if (geolocationInvers != []) {
        const latitude = stadtone.latitude;
        const longitude = stadtone.longitude;
        const geolocation = `${latitude},${longitude}`;
        const geopos = `${latitude};${longitude}`;
        return res.render(`${UNTERORDNER}{hauptort}/`, {
          stadtone,
          SITE_KEY,
          DOMAIN,
          arr,
          keyword,
          geolocation,
          short_code,
          geopos,
          latitude,
          longitude,
        });
      }
    });

    router.get(`/:hauptort/${keyword}:ort/`, async (req, res) => {
      const { hauptort, ort } = req.params;
      const stadt = await StaedteListe.find({
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      const stadtone = await StaedteListe.findOne({
        ortUrl: ortRegex(ort),
        hauptortUrl: hauptort.replace(/[0-9]/g, ""),
      });
      if (stadtone === null) {
        return res.render("index", { SITE_KEY, DOMAIN });
      }

      let arr = randomnArr(stadt, ANZAHL_FUER_FOOTER_STAEDTE);
      // const mbURL = mapBoxApiUrl(stadtone.ortUrl, stadtone.bundeslandUrl);
      const geolocationInvers = [0, 0];
      const short_code = stadtone.short_code;
      if (geolocationInvers != []) {
        const latitude = stadtone.latitude;
        const longitude = stadtone.longitude;
        const geolocation = `${latitude},${longitude}`;
        const geopos = `${latitude};${longitude}`;
        return res.render(`${UNTERORDNER}{hauptort}/${keyword}{ort}`, {
          stadtone,
          SITE_KEY,
          DOMAIN,
          arr,
          keyword,
          geolocation,
          short_code,
          geopos,
          latitude,
          longitude,
        });
      }
    });
    //====================================
  }
};

KEYWORDS.forEach((keyword) => modRoutes(KEYWORD_REVERSE, UNTERORDNER, keyword));

module.exports = router;
