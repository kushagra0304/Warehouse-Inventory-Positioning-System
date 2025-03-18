import { JSONFilePreset } from 'lowdb/node'

// Define the database file
const db = await JSONFilePreset('db.json', {
    
})

// Export the database instance
export default db;