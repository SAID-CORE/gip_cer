const { Client } = require('pg')
async function handler(event, context) {
    console.log("event: ", JSON.stringify(event))
    console.log("context: ", JSON.stringify(context))

    for (record of event.Records) {
        const userId = record.s3.object.key.split("/")[0]
        const billId = record.s3.object.key.split("/")[1]

        // update user bills field
        await updateUserBills(userId, billId)
    }
}

async function updateUserBills(userId, billId){
    let userCheckResponse = await checkUserExistence(userId);

    if (userCheckResponse){
        // client connection
        const client = new Client(process.env.DB_URL);
        await client.connect();
        // query execution
        try {
            const values = [userId, [billId]]
            const sql = "UPDATE users SET bill_keys = bill_keys || $2 WHERE id = $1";
            let results = await client.query(sql, values)
            console.log(results)
        } catch (err) {
            console.error("error executing query:", err);
        } finally {
            client.end();
        }
    }
}

async function checkUserExistence(id) {
    const client = new Client(process.env.DB_URL);
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

module.exports = {handler, test, updateUserBills, checkUserExistence};