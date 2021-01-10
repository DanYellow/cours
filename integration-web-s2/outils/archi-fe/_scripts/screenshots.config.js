const listDevices = [
  { name: "pc-bureau", width: 1920, height: 1080 },
  { name: "ordi-portable-15", width: 1366, height: 768 },
  {
    name: "ordi-portable-retina",
    width: 1366,
    height: 768,
    deviceScaleFactor: 2,
  },
  {
    name: "iPad-portrait",
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isLandscape: true,
    hasTouch: true,
  },
  {
    name: "iPad-landscape",
    width: 1024,
    height: 768,
    deviceScaleFactor: 2,
    hasTouch: true,
    isLandscape: true,
  },
  {
    name: "pixel-5",
    width: 393,
    height: 851,
    deviceScaleFactor: 4,
    hasTouch: true,
  },
  {
    name: "iPhone-8",
    width: 375,
    height: 667,
    deviceScaleFactor: 1,
    hasTouch: true,
  },
  {
    name: "iPhone-X-max",
    width: 414,
    height: 896,
    deviceScaleFactor: 3,
    hasTouch: true,
  },
];

module.exports = listDevices;
