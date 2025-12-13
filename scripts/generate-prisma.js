
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("Starting custom Prisma generation...");
console.log("DB URL exists:", !!process.env.DATABASE_URL);

// Run prisma generate
const prisma = spawn('npx.cmd', ['prisma', 'generate'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env } // Pass loaded env vars explicitly
});

prisma.on('close', (code) => {
    console.log(`Prisma generate process exited with code ${code}`);
    process.exit(code);
});
