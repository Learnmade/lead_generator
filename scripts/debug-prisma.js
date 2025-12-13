
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../debug_log.txt');
const logStream = fs.createWriteStream(logPath);

console.log("Starting debug generation...");

const prisma = spawn('npx.cmd', ['prisma', 'generate'], {
    cwd: path.join(__dirname, '..'),
    shell: true,
    env: { ...process.env }
});

prisma.stdout.pipe(logStream);
prisma.stderr.pipe(logStream);

prisma.on('close', (code) => {
    console.log(`Process exited with code ${code}`);
    logStream.end();
});
