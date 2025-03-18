import axios from 'axios';

let base = ""

if(import.meta.env.MODE === "development") {
    base = "http://localhost:3000"
}

export const startScanner = async (coord) => {
    try {
        await axios.post(`${base}/api/scanner/startScanner`, coord);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

export const markTagsAsFound = async (tags) => {
    try {
        return await axios.post(`${base}/api/scanner/tagsFound`, tags);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}

// emulate
export const senseNearByTags = async (coord) => {
    try {
        return await axios.post(`${base}/api/scanner/emulate/getTags`, coord);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}