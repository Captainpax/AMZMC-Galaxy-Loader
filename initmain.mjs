import { startDnsServer, stopDnsServer, getDnsStatus } from './servers/dnsServer.mjs';
import { startHubServer, stopHubServer, getHubStatus } from './servers/hubServer.mjs';
//import { startSmpServer, stopSmpServer, getSmpStatus } from './servers/smpServer.mjs';
// Import other servers similarly...

const startServers = async () => {
    try {
        console.log('Starting DNS server...');
        await startDnsServer();
        console.log('DNS server started.');

        console.log('Starting Hub server...');
        await startHubServer();
        console.log('Hub server started.');

        //console.log('Starting SMP server...');
        //await startSmpServer();
        //console.log('SMP server started.');

        // Start other servers as needed
        // await startOtherServer();

    } catch (error) {
        console.error('Error starting servers:', error);
        // Optionally stop all servers if there's an error
        stopDnsServer();
        stopHubServer();
        //stopSmpServer();
        // Stop other servers...
    }
};

const stopServers = () => {
    console.log('Stopping all servers...');
    stopDnsServer();
    stopHubServer();
    //stopSmpServer();
    // Stop other servers...
};

const getServerStatuses = () => {
    console.log('Server statuses:');
    console.log(`DNS: ${getDnsStatus()}`);
    console.log(`Hub: ${getHubStatus()}`);
    //console.log(`SMP: ${getSmpStatus()}`);
    // Get other server statuses...
};

// Example usage:
startServers().then(r => stopServers());

// To stop servers after some time (e.g., 1 hour):
// setTimeout(stopServers, 3600000);

// To check server statuses at any point:
getServerStatuses();
