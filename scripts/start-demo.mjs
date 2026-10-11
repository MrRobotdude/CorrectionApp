import {spawn, spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const backendPort=Number(process.env.CORRECTION_BACKEND_PORT || 4000);
const frontendPort=Number(process.env.CORRECTION_FRONTEND_PORT || 3000);
if(![backendPort,frontendPort].every(port=>Number.isInteger(port)&&port>1024&&port<65536)||backendPort===frontendPort)throw new Error('Use two distinct ports between 1025 and 65535.');
const processes=[];
let stopping=false;
const stop=()=>{
 if(stopping)return;stopping=true;
 for(const child of processes){
  if(!child.pid||child.exitCode!==null)continue;
  if(process.platform==='win32')spawnSync('taskkill',['/PID',String(child.pid),'/T','/F'],{stdio:'ignore',windowsHide:true});
  else child.kill();
 }
};
const backend=spawn(process.execPath,['server.js'],{cwd:resolve(root,'backend'),stdio:'inherit',env:{...process.env,PORT:String(backendPort),FRONTEND_ORIGIN:process.env.FRONTEND_ORIGIN || `http://127.0.0.1:${frontendPort}`,MONGODB_URI:process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/correction_portfolio_demo'}});processes.push(backend);
const frontend=spawn(process.platform==='win32'?'npm.cmd':'npm',['run','start:portfolio'],{cwd:resolve(root,'frontend'),stdio:'inherit',shell:process.platform==='win32',windowsHide:true,env:{...process.env,PORT:String(frontendPort),HOST:'127.0.0.1',BROWSER:'none',REACT_APP_PORTFOLIO_DEMO:'true',REACT_APP_API_BASE_URL:process.env.REACT_APP_API_BASE_URL || `http://127.0.0.1:${backendPort}`}});processes.push(frontend);
process.on('SIGINT',stop);process.on('SIGTERM',stop);
for(const child of processes){child.on('error',error=>{console.error(error.message);stop();process.exitCode=1;});child.on('exit',code=>{if(!stopping){stop();process.exitCode=code || 0;}});}
console.log(`Local assessment demo: http://127.0.0.1:${frontendPort}`);
