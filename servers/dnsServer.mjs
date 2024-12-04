import { spawn } from 'child_process';
import path from 'path';
import chalk from 'chalk';

const dnsDirectory = 'S:/Antimatter Zone Minecraft Galaxy/AMZMC_DNS';
const dnsPath = `${dnsDirectory}/velocity-3.4.0-SNAPSHOT-453.jar`;
const absoluteDnsPath = path.resolve(dnsPath);
const absoluteDnsDirectory = path.resolve(dnsDirectory);

let dnsServer = null;

export const startDnsServer = () => {
    return new Promise((resolve, reject) => {
        const args = ['-jar', absoluteDnsPath, 'nogui'];
        dnsServer = spawn('java', args, { cwd: absoluteDnsDirectory });

        dnsServer.stdout.on('data', (data) => {
            console.log(chalk.green(`DNS stdout: ${data}`));
            // Resolve when server starts successfully
            if (data.toString().includes('Listening on')) {
                resolve();
            }
        });

        dnsServer.stderr.on('data', (data) => {
            console.log(chalk.red(`DNS stderr: ${data}`));
            reject(new Error(data.toString()));
        });

        dnsServer.on('close', (code) => {
            console.log(chalk.grey(`DNS server exited with code ${code}`));
            dnsServer = null;
        });
    });
};

export const stopDnsServer = () => {
    if (dnsServer) {
        dnsServer.stdin.write('stop\n');
        console.log(chalk.yellow('Sent "stop" command to DNS server.'));
    }
};

export const getDnsStatus = () => {
    return dnsServer ? 'running' : 'stopped';
};
