const EventEmitter = require("events");
const { readFileSync, readFile, watch } = require("fs");
const http = require("http");
const port = 4444;
let backgrounds = JSON.parse(readFileSync("config.json"))["backgrounds"];
let eventEmitter = new EventEmitter();

const server = http.createServer((req, res) => {
    if (req.url.includes("main.min")) return;
    if (req.method === "POST"){
        let body = "";
        req.on("data", (chunk) => {
            body += chunk
        });
        req.once("end", () => {
            backgrounds = body.replace('"', "").split(",");
            eventEmitter.emit("event");
        });
        return;
    }
    if (req.url === "/"){
        res.write(readFileSync("./background-command-files/index.html"));
        res.end();
        return;
    }else if(req.url.indexOf(".") != -1){
        let type = req.url.substring(req.url.indexOf(".")+1);
        if (type === "js") type = "javascript";
        res.writeHead(200, {
            "content-type": `text/${type}`
        })
        let file = readFileSync(req.url.replace("/", "./background-command-files/"));
        res.write(file);
        res.end();
        return;
    }else if(req.url != "/event"){
        res.writeHead(200, {
            "content-type": "text/html"
        });
        res.write(readFileSync(`${req.url.replace("/", "./background-command-files/")}.html`));
        res.end();
        return;
    };

    res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        "connection": "keep-alive",
        "access-control-allow-origin": true
    });
    
    // console.log("pong");
    res.write("event: backgrounds\n");
    res.write(`data: ${backgrounds}\n\n`)
    req.on("error", (err) => {
        console.log(`req: ${err}`);
    });
    res.on("error", (err) => {
        console.log(`res: ${err}`)
    })
    req.on("close", () => {
        console.log("closed");
        res.end();
    });
    eventEmitter.addListener("event", () => {
        res.write(`event: backgrounds\ndata: ${backgrounds}\n\n`);
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`)
});