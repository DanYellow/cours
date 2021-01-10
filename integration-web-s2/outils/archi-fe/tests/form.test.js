const path = require("path");
const puppeteer = require("puppeteer");
const queryString = require('query-string');

const queryStringRegex = /[^?]*$/;

(async () => {
  // cwd = current working directory | Le dossier d'où on travail, ici on le définit à la racine du projet
  const cwd = path.join(__dirname, `../dist`);

  const urlPath = path.resolve(`${cwd}/index.html`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${urlPath}`);

  const nom = "Caulfield";
  const prenom = "Holden";

  await page.type('[data-testid="champ-prenom"]', prenom);
  await page.type('[data-testid="champ-nom"]', nom);
  await page.keyboard.press("Enter");

  await page.waitForNavigation();
  
  const parsed = queryString.parse(queryStringRegex.exec(page.url())[0]);


  await browser.close();
})();
