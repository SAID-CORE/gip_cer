import {Client} from "pg";

async function getter(request, {params}) {
    // value to query in db
    const values = [params.city]

    // client connection
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();

    // query execution
    try {
        const sql = "SELECT COUNT(*) FROM users WHERE city = $1"
        let results = await client.query(sql, values)
        return new Response(JSON.stringify(results.rows));
    } catch (err) {
        console.error("error executing query:", err);
    } finally {
        client.end();
    }
}

export {getter as GET}