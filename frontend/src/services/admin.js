import axios from 'axios';

let base = ""

if(import.meta.env.MODE === "development") {
    base = "http://localhost:3000"
}

// emulate
export const fetchPositionOfFoundTags = async () => {
    try {
        return await axios.get(`${base}/api/admin/getRelativePositionOfTagsFound`);
    } catch (error) {
        console.log(error);
        console.log("Error connecting to server")
    }
}