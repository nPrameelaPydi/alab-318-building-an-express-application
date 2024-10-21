const express = require("express");
const app = express()
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`appServer is listening on port: ${PORT}`);
})

const fs = require('fs');
app.engine("ps", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        const rendered = content
            .toString()
            .replaceAll("#title#", `${options.title}`)
            .replace("#content#", `${options.content}`);

        return callback(null, rendered);
    });
});

app.set("views", "./views");
app.set("view engine", "ps");

app.get("/view-test", (req, res) => {
    const options = {
        title: "Alab-318-Express-Application",
        content: "sometext dispaly",
    };
    res.render("index", options);
});
