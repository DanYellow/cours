const util = require("util");

const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const exec = util.promisify(require("child_process").exec);
const voca = require("voca");
const argv = require("minimist")(process.argv.slice(2));

const listDevices = require("./screenshots.config.js");

async function promisedExec(cmd) {
  try {
    const { stdout, stderr } = await exec(cmd);
    return { stdout, stderr };
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

const mergeScreenshots = async ({ listImgsName, dir }) => {
  const filenameRegexp = /(_tmp-)(.*?)(-part-\d+)/gi;
  const match = filenameRegexp.exec(listImgsName[0]);

  const fileName = match[2];

  const listCleanedPaths = listImgsName.map((path) =>
    path.replace(/\\\\/g, "\\")
  );

  const trimLastImg = [
    `magick convert ${listCleanedPaths[listCleanedPaths.length - 1]} \
    -background white -splice 0x1 -background black -splice 0x1 \
    -trim +repage -chop 0x1 \
     ${listCleanedPaths[listCleanedPaths.length - 1]}`,
  ];

  // magick convert food1.jpg -background white -splice 0x1 -background black -splice 0x1 -trim +repage -chop 0x1 trim_foo.jpg

  const deleteCmd = [
    `rm -f ${listCleanedPaths.join(" ")} _tmp-${fileName}.jpg`,
  ];

  const imgMagickCmdList = [
    `magick convert -gravity center -append ${listCleanedPaths.join(
      " "
    )} "_tmp-${fileName}.jpg"`,
    `&&`,
    `magick convert "_tmp-${fileName}.jpg" -gravity South -pointsize 25 -background none -undercolor black -fill "#FFFFFF" -annotate +0+10 "${fileName}.html" -density 300 "${fileName}.jpg"`,
  ];

  await promisedExec(
    `cd ${dir} && ${imgMagickCmdList.join(" ")} && ${deleteCmd}`
  );
};

const generateArchives = async (dir) => {
  promisedExec(`cd ${dir} && tar -cvf ../screenshots.tar .`);
};

const cleanDirs = (dir) => {
  const cwd = path.join(__dirname, `../${dir}`);
  const screenshotsDir = path.join(cwd, "../__screenshots");
  fs.rmdirSync(screenshotsDir, { recursive: true });
  fs.mkdirSync(screenshotsDir, { recursive: true });
  if (fs.existsSync(path.join(cwd, "../screenshots.tar"))) {
    fs.unlinkSync(path.join(cwd, "../screenshots.tar"));
  }
};

const getHTMLFiles = (dir) => {
  const cwd = path.join(__dirname, `../${dir}`);
  if (!fs.existsSync(cwd)) {
    throw "Missing dist folder - Please run 'npm run start' or gulp's task 'build:start'"
  }

  const listTemp = fs.readdirSync(cwd).filter((el) => /\.html$/.test(el));
  const screenshotsDir = path.join(cwd, "../__screenshots");

  return {
    files: listTemp.map((item) => {
      return path.resolve(`${cwd}/${item}`);
    }),
    screenshotsDirPath: screenshotsDir,
  };
};

const createScreenshots = async (device, fileName, page, browser, dir) => {
  const bodyHandle = await page.$("body");
  const { height } = await bodyHandle.boundingBox();

  const listImgsPaths = {
    dir,
    listImgsName: [],
  };

  await page.waitForTimeout(1000);

  const nbScreens = Math.ceil(Math.ceil(height) / device.height);

  let screenYOffset = 0;
  let imgPath = "";

  for (let i = 0; i < nbScreens; i++) {
    imgName = `_tmp-${device.name}-${voca.kebabCase(fileName)}-part-${i}.jpg`;
    imgPath = path.join(dir, imgName);

    screenYOffset = i === 0 ? 0 : device.height;
    await page.evaluate((screenYOffset) => {
      window.scrollBy(0, screenYOffset);
    }, screenYOffset);

    const screenshot = await page.screenshot({
      path: imgPath,
      type: "jpeg",
      quality: 50,
      clip: {
        x: 0,
        y: device.height * i,
        width: device.width,
        height: device.height,
      },
    });

    // Prevents broken sites
    if (screenshot) {
      listImgsPaths.listImgsName.push(imgName);
    }
  }

  await bodyHandle.dispose();
  await browser.close();

  return listImgsPaths;
};

const browserSetup = async (device, url, screenshotsDirPath) => {
  const browser = await puppeteer.launch({
    product: "chrome",
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`file://${url}`);

  const extension = path.extname(url);
  const fileName = path.basename(url, extension);

  await page.setViewport({ ...device });

  const listScreenshotsPaths = await createScreenshots(
    device,
    fileName,
    page,
    browser,
    screenshotsDirPath
  );
  if (listScreenshotsPaths.listImgsName.length > 0) {
    await mergeScreenshots(listScreenshotsPaths);
  }
};

const manageScreenshots = async () => {
  console.time();

  cleanDirs("./dist");
  const { files: listHTMLFiles, screenshotsDirPath } = getHTMLFiles("./dist");
  if (listHTMLFiles.length) {
    for (const device of listDevices) {
      for (const filepath of listHTMLFiles) {
        await browserSetup(device, filepath, screenshotsDirPath);
      }
    }

    await generateArchives(screenshotsDirPath);
    console.log(`> finished`);
  }

  console.timeEnd();
};

manageScreenshots();
