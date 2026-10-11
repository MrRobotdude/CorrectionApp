import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const processes=[];
const backend=spawn(process.execPath,['server.js'],{cwd:resolve(root,'backend'),stdio:'inherit',env:{...process.env,MONGODB_URI:process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/correction_portfolio_demo'}});processes.push(backend);
const frontend=spawn(process.platform === 'win32' ? 'npm.cmd':'npm',['run','start:portfolio'],{cwd:resolve(root,'frontend'),stdio:'inherit',shell:process.platform === 'win32',env:{...process.env,HOST:'127.0.0.1',REACT_APP_PORTFOLIO_DEMO:'true',REACT_APP_API_BASE_URL:process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:4000'}});processes.push(frontend);
const stop=()=>processes.forEach(p=>p.kill());process.on('SIGINT',stop);process.on('SIGTERM',stop);for(const p of processes){p.on('error',e=>{console.error(e.message);stop();process.exitCode=1;});}
