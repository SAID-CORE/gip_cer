import {Client} from "pg";
import {validateFirstFormData, genUuid5} from "./utils.js"

async function poster(request) {
    // extract body from request
    const body = await request.json();

    // data validation
    let response = await validateFirstFormData(body);

    if (!response.success) {
        return new Response(JSON.stringify(response), {status: 400});
    } else {
        // data have been validated

        // client connection
        const client = new Client(process.env.DATABASE_URL);
        await client.connect();

        // values to insert into db
        const values = [await genUuid5(body.num_tel, process.env.SALT), body.name, body.surname, body.num_tel, body.email, body.address, body.city, body.geo_data, body.terms]

        // query execution
        try {
            const sql = "INSERT INTO users(id, name, surname, num_tel, email, address, city, geo_data, terms) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)  ON CONFLICT (num_tel) DO UPDATE SET num_tel=$4 RETURNING id"
            let results = await client.query(sql, values)
            console.log(results);
            if (results.rowCount === 1) {
                return new Response(JSON.stringify({"success": true, "message": "data inserted correctly", "id": results.rows[0].id}));
            } else {
                return new Response(JSON.stringify({"success": false, "message": "data not inserted"}), {status: 400});
            }
        } catch (err) {
            console.error("error executing query:", err);
            return new Response(JSON.stringify({"success": false, "message": "error executing query"}), {status: 400});
        } finally {
            client.end();
        }
    }
}

export {poster as POST}