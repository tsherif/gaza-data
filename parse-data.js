/////////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
// 
// Copyright (c) 2014 Tarek Sherif
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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