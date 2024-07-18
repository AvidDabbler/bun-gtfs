import { importGtfs } from "gtfs";
import gtfsToGeoJSON from "gtfs-to-geojson";
// @ts-expect-error no types
import gtfsToHtml from "gtfs-to-html";

export const gtfsConfig = {
  agencies: [
    {
      agency_key: process.env.AGENCY_NAME,
      url: process.env.GTFS_URL,
    },
  ],
  sqlitePath: "drizzle/data.db",
  debug: false,
  noHead: true,
  beautify: true,
  outputFormat: "lines-and-stops",
  outputType: "route",
  showMap: false,
};

export const load = () => {
  try {
    importGtfs(gtfsConfig)
      .then(() => {
        gtfsToHtml(gtfsConfig);
      })
      .then(() => {
        console.log("HTML Generation Successful");
        process.exit();
      })
      .then(() => {
        gtfsToGeoJSON(gtfsConfig as any);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  } catch (error) {
    console.error(error);
  }
};
