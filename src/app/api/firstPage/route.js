import {Client} from "pg";
import {validateFirstFormData} from "./utils.js"

async function poster(request) {
    // extract body from request
    const body = await request.json();

    // data validation
    let response = await validateFirstFormData(body);

    if (!response.success) {
        return new Response(JSON.stringify(response));
    } else {
        // data have been validated

        // client connection
        const client = new Client(process.env.DATABASE_URL);
        await client.connect();

        // values to insert into db
        const values = [body.email, body.num_tel, body.name, body.surname]

        // query execution
        try {
            const sql = "INSERT INTO users(email, num_tel, name, surname) VALUES($1, $2, $3, $4)  ON CONFLICT (num_tel) DO UPDATE SET num_tel=$2 RETURNING id"
            let results = await client.query(sql, values)
            console.log(results);
            return new Response(JSON.stringify(results.rows));
        } catch (err) {
            console.error("error executing query:", err);
        } finally {
            client.end();
        }
    }
}

export {poster as POST}