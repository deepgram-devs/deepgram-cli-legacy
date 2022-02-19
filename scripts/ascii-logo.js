#!/usr/bin/env node

const asciify = require("asciify-image");
const fs = require("fs");

const options = {
  fit: "width",
  width: 22,
};

asciify("deepgram.png", options)
  .then(function (asciified) {
    fs.writeFile("deepgram.png.ascii.txt", asciified, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      //file written successfully
    });
  })
  .catch(function (err) {
    // Print error to console
    console.error(err);
  });
