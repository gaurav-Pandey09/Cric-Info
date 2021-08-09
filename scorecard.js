let request = require("request");
let cheerio = require("cheerio");

// let url =
// "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
console.log("Before");
function processingSingleMatch(url) {
  request(url, cb);
}

function cb(error, response, html) {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else if (response.statusCode == 404) {
    console.log("Page Not Found");
  } else {
    // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    //console.log("body:", html); // Print the HTML for the Google homepage.\
    console.log("`````````````````````````````````````");
    dataExtractor(html);
  }
}

function dataExtractor(html) {
  let searchTool = cheerio.load(html);
  // css selector
  let bothInningArr = searchTool(".Collapsible");
  //let scoreCard = "";
  for (let i = 0; i < bothInningArr.length; i++) {
    let teamNameElem = searchTool(bothInningArr[i]).find("h5");
    let teamName = teamNameElem.text();

    teamName = teamName.split("INNINGS")[0];

    teamName = teamName.trim();
    console.log(teamName);
    let batsManTableBodyAllRows = searchTool(bothInningArr[i]).find(
      ".table.batsman tbody tr"
    );

    for (let j = 0; j < batsManTableBodyAllRows.length; j++) {
      let numberOfTds = searchTool(batsManTableBodyAllRows[j]).find("td");

      if (numberOfTds.length == 8) {
        let playerName = searchTool(numberOfTds[0]).text();
        let runs = searchTool(numberOfTds[2]).text().trim();
        let balls = searchTool(numberOfTds[3]).text().trim();
        let fours = searchTool(numberOfTds[5]).text().trim();
        let sixes = searchTool(numberOfTds[6]).text().trim();
        let sr = searchTool(numberOfTds[7]).text().trim();

        console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
      }
    }
    console.log("``````````````````````````````````````");
  }
}
console.log("After");

module.exports = {
  processingSingleMatch,
};
