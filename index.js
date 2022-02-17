const fs = require("fs");

const dentists = require("./json-data/dentists.json");
const doctors = require("./json-data/doctors.json");
const nurses = require("./json-data/nurses.json");
const pharmacists = require("./json-data/pharmacists.json");

let newDataObj = [];

for (let i = 0; i < dentists.length; i++) {
  let obj = {
    country: dentists[i].Location,
    country_code: dentists[i].SpatialDimValueCode,
  };

  if (!newDataObj.some((e) => e.country == obj.country)) {
    newDataObj.push(obj);
  }
}

const test = [];
console.log(newDataObj.length)

for (let i = 0; i < 191; i++) {
  let dentistsTest = dentists.filter((e) => e.Location === newDataObj[i].country);
  let doctorsTest = doctors.filter((e) => e.Location === newDataObj[i].country);
  let nursesTest = nurses.filter((e) => e.Location === newDataObj[i].country);
  let pharmacistsTest = pharmacists.filter((e) => e.Location === newDataObj[i].country);
  
  let year = 2020;

  for (let j = 0; j < dentistsTest.length; j++) {
    if (parseInt(dentistsTest[j].Period) === year) {
      let testObj = {
        location: dentistsTest[j].Location,
        year,
        dentists_per_capita: dentistsTest[j]?.Value,
        doctors_per_capita: doctorsTest[j]?.Value,
        nurses_per_capita: nursesTest[j]?.Value,
        pharmacists_per_capita: pharmacistsTest[j]?.Value,
      };
      test.push(testObj);
    }
    console.log(j);
    year = parseInt(dentistsTest[j + 1]?.Period);
  }
}


let dictstring = JSON.stringify(test);

fs.writeFile("generated-records.json", dictstring, function (err, result) {
  if (err) console.log("error", err);
});
