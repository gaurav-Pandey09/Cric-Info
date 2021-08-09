//npm i request
let request = require("request");
//npm i cheerio
let cheerio = require("cheerio");

let scoreCardObj = require("./scorecard");
//fs
let fs = require("fs");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
console.log("Before");
request(url, cb);
function cb(error, response, html) {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else if (response.statusCode == 404) {
    console.log("Page Not Found");
  } else {
    // console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
    // console.log("body:", html); // Print the HTML for the Google homepage.
    dataExtractor(html);
  }
}

function dataExtractor(html) {
  //search tool
  let searchTool = cheerio.load(html);
  //global tool
  let anchorRep = searchTool('a[data-hover="View All Results"]');
  let link = anchorRep.attr("href");
  console.log(link);
  let fullLink = `https://www.espncricinfo.com${link}`;
  console.log(fullLink);
  request(fullLink, allMatchCb);
}

function allMatchCb(error, response, html) {
  if (error) {
    console.error("error:", error); // Print the error if one occurred
  } else if (response.statusCode == 404) {
    console.log("Page Not Found");
  } else {
    //console.log(html);
    console.log("``````````````````````````````");
    getAllScoreCardLink(html);
  }
}

function getAllScoreCardLink(html) {
  let searchTool = cheerio.load(html);
  let scorecardsArr = searchTool("a[data-hover='Scorecard']");
  for (let i = 0; i < scorecardsArr.length; i++) {
    let link = searchTool(scorecardsArr[i]).attr("href");

    let fullLink = `https://www.espncricinfo.com${link}`;
    console.log(fullLink);
    scoreCardObj.processingSingleMatch(fullLink);
  }
}

console.log("after");
