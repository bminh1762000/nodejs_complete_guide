const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<header><title>Form Input</title></header>");
    res.write("<body>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(Buffer.concat(body).toString());
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<header><title>Nodejs server</title></header>");
  res.write("<body>");
  res.write("<h1>Hello Nodejs Server</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// module.exports = {
//     handler : requestHandler,
//     someText : 'Some hard coded text'
// };

// exports.handler = requestHandler;
