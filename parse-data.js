/////////////////////////////////////////////////////////////////////////////////////
// DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
// Version 2, December 2004
// 
// Copyright (c) 2014 Tarek Sherif
// 
// Everyone is permitted to copy and distribute verbatim or modified
// copies of this license document, and changing it is allowed as long
// as the name is changed.
// 
// DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
// TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
// 
// 0. You just DO WHAT THE FUCK YOU WANT TO.
// 
/////////////////////////////////////////////////////////////////////////////////////

"use strict";

var fs = require("fs");

var input = process.argv[2] || "gaza.csv";
var output = process.argv[3] || (input.replace(/\.csv$/, "") + ".json");

var dead = [];

fs.readFile(input, { encoding: "utf8" }, function(err, data) {
  if (err) {
    throw new Error(err);
  }

  var lines = data.split("\n");

  lines.forEach(function(line, line_no) {
    if (!line.trim().match(/^[^,\n]*,\d*\.?\d*,[^,\n\d]*,(\d+\/\d+\/\d+)?$/)) {
      console.error("Line ", line_no + 1, " invalid: ", line);
      process.exit(1);
    }

    line = line.trim().split(",");

    var name = line[0] || null;
    var age = line[1] ? parseFloat(line[1]) : null;
    var location_of_death = line[2] ? line[2].replace("killed in ", "") : null;
    var date_of_death = line[3] || null;

    dead.push({
      name: name,
      age: age,
      location_of_death: location_of_death,
      date_of_death: date_of_death
    });
  });

  fs.writeFile(output, JSON.stringify(dead, null, 2), { encoding: "utf8" }, function(err) {
    if (err) {
      throw new Error(err);
    }
  });
});