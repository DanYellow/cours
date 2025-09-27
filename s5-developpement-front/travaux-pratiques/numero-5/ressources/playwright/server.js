import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.static("src"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/form.html");
});

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

app.get("/api/:region?", async (req, res) => {
    const region = req.params.region ? req.params.region : "metropole";

    const response = await fetch(
        `https://calendrier.api.gouv.fr/jours-feries/${region}.json`
    );
    const jsonRes = await response.json();

    const payload = [];
    let nextDate = null;
    const currentYear = new Date().getFullYear();
    const endNextYear = new Date(`${currentYear + 1}-06-30`);

    for (const [key, value] of Object.entries(jsonRes)) {
        nextDate = new Date(key);
        if (nextDate > new Date() && nextDate < endNextYear) {
            payload.push({
                rawDate: nextDate,
                date: nextDate.toLocaleDateString("fr"),
                name: value,
            });
        }
    }

    // Pause randomly the code
    await new Promise((r) => setTimeout(r, randomIntFromInterval(0, 5) * 1000));

    const resOrdered = payload
        .sort((a, b) => {
            return new Date(b.rawDate) - new Date(a.rawDate);
        })
        .map((item) => {
            delete item.rawDate;
            return item;
        });

    res.status(200).json(resOrdered);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
