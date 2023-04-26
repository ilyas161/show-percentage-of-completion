const readline    = require("readline");
const fs          = require("fs");
const cliProgress = require('cli-progress');
const colors      = require('ansi-colors');

const inputTextFile = "free_company_dataset.csv";
const inputStream = fs.createReadStream(inputTextFile);
const rl = readline.createInterface({
    input: inputStream,
});

const b1 = new cliProgress.SingleBar({
    format: 'CLI Progress |' + colors.red('{bar}') + '| {percentage}% || {value}/{total} Chunks  ' + colors.bgGreen('Speed: {speed}'),
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

const stat = fs.statSync(inputTextFile);
b1.start(stat.size, 0, {
    speed: "N/A"
});

sizeCounter = 0;

inputStream.on("data", (chunk) => {
    sizeCounter += chunk.byteLength;
    b1.update(sizeCounter);
}).on("close", () => {
    b1.stop();
});

let lineCount = 0;

rl.on("line", (line) => {
    lineCount++;
    //console.log(line.split(",")[0]);
})