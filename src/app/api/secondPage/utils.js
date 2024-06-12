import {Client} from "pg";

// check user id existence
async function checkUserExistence(id) {
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();

    try {
        const values = [id]
        const sql = "SELECT 1 EXISTS FROM users WHERE id=$1";
        let results = await client.query(sql, values)
        return results.rowCount > 0
    } catch (err) {
        console.error("error executing query:", err);
    } finally {
        client.end();
    }
}

export {checkUserExistence}