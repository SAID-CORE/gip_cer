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

async function validateSecondFormData(data) {
    // checking for missing mandatory fields
    let missingList = []
    if (!data.hasOwnProperty("user_type")){
        missingList.push("user_type")
    }
    if (!data.hasOwnProperty("property_type")){
        missingList.push("property_type")
    }

    if (missingList.length > 0) {
        return {"success": false, "message": "missing parameters " + missingList.toString()}
    } else {
        return {"success": true, "message": "data validated correctly"}
    }
}

export {checkUserExistence, validateSecondFormData}