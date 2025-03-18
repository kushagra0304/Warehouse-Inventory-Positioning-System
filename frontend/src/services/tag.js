import axios from 'axios';

let base = ""

if(import.meta.env.MODE === "development") {
    base = "http://localhost:3000"
}

// emulate
export const broadcastSignal = async (body, uid) => {
    try {
        return await axios.post(`${base}/api/tag/emulate/ping/${uid}`, body);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}