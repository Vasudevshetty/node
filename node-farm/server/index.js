import fs from "fs";
import http from "http";
import CardsContainer from "../src/CardsContainer";
import { renderToString } from "react-dom/server";
// import url from "url";

// Files

/* bringing in text from synchrnous way.
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what we know about avacado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("text written");

// writing it asynchorounsly since it blocks the code.
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", () => {
        console.log("Your file has been written");
      });
    });
  });
});

*/
const data = fs.readFileSync(`./dev-data/data.json`, "utf-8");
const products = JSON.parse(data);

// server
const server = http.createServer((request, response) => {
  const pathName = request.url;

  if (pathName === "/" || pathName === "/overview")
    response.end("Overview page");
  else if (pathName === "/product") response.end("Product page");
  else if (pathName === "/api") {
    response.writeHead(200, {
      "Content-type": "application/json",
    });
    const html = renderToString(<CardsContainer products={products} />);
    console.log(html);
    response.end(data);
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    response.end("Page not found");
  }
});

server.listen(8000, "localhost", () => {
  console.log("listening to requests on port 8000");
});
