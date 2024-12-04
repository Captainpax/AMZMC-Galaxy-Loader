import { spawn } from 'child_process';
import path from 'path';
import chalk from 'chalk';

const hubDirectory = 'S:/Antimatter Zone Minecraft Galaxy/AMZMC_Hub';
const hubPath = `${hubDirectory}/paper-1.21.1-132.jar`;
const absoluteHubPath = path.resolve(hubPath);
const absoluteHubDirectory = path.resolve(hubDirectory);

let hubServer = null;

export const startHubServer = () => {
    return new Promise((resolve, reject) => {
        const args = ['-jar', absoluteHubPath, 'nogui'];
        hubServer = spawn('java', args, { cwd: absoluteHubDirectory });

        hubServer.stdout.on('data', (data) => {
            const dataString = data.toString();
            if (dataString.includes('WARN')) {
                console.log(chalk.red(`Hub WARN: ${dataString}`));
            } //else { console.log(chalk.green(`Hub stdout: ${dataString}`));}
            // Resolve when the server is fully loaded
            if (dataString.includes('Done (')) {
                resolve();
            }
        });

        hubServer.stderr.on('data', (data) => {
            console.log(chalk.red(`Hub stderr: ${data}`));
            reject(new Error(data.toString()));
        });

        hubServer.on('close', (code) => {
            console.log(chalk.grey(`Hub server exited with code ${code}`));
            hubServer = null;
        });
    });
};

export const stopHubServer = () => {
    if (hubServer) {
        hubServer.stdin.write('stop\n');
        console.log(chalk.yellow('Sent "stop" command to Hub server.'));
    }
};

export const getHubStatus = () => {
    return hubServer ? 'running' : 'stopped';
};
