const { execSync } = require("child_process");
const os = require("os");

// Function to get the internal IPv4 address
function getLocalIPv4() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    throw new Error("No internal IPv4 address found.");
}

// Get the local IP
const localIP = getLocalIPv4();
console.log(`Local IPv4 Address: ${localIP}`);

// Generate mkcert for the local IP
try {
    execSync(`mkcert localhost ${localIP}`, { stdio: "inherit" });
    console.log(`Certificate generated for ${localIP}`);
} catch (error) {
    console.error("Error generating certificate:", error);
}
