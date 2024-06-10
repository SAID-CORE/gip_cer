import {Client} from "pg";

async function getter(request, {params}) {
    console.log("user id params: ", params.user_id)

    // client connection
    const client = new Client(process.env.DATABASE_URL);
    await client.connect();

    // query execution
    try {
        const values = [params.user_id]
        const sql = "SELECT * FROM users WHERE id=$1"
        let results = await client.query(sql, values)
        // console.log(results);

        return new Response(JSON.stringify(results.rows));
    } catch (err) {
        console.error("error executing query:", err);
    } finally {
        client.end();
    }
}

export {getter as GET}