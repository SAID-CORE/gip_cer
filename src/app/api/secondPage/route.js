import {Client} from "pg";
import {checkUserExistence, validateSecondFormData} from "./utils.js"

async function poster(request) {
    // extract body from request
    const body = await request.json();

    // user id and data validation
    let user_check_response = await checkUserExistence(body.id)
    let data_check_response = await validateSecondFormData(body)

    // user id and data are validated
    if (user_check_response && data_check_response.success) {
        // client connection
        const client = new Client(process.env.DATABASE_URL);
        await client.connect();

        //values to update the user into db
        const values = [body.id, body.avg_monthly_bill, body.user_type, body.property_type, body.community_type, body.has_pv_type, body.terms]

        // query execution
        try {
            const sql = "UPDATE users SET avg_monthly_bill=$2, user_type=$3, property_type=$4, community_type=$5, has_pv_type=$6, terms=$7 WHERE id=$1"
            let results = await client.query(sql, values)
            console.log(results);
            if (results.rowCount === 1) {
                return new Response(JSON.stringify({"success": true, "message": "data updated correctly"}));
            } else {
                return new Response(JSON.stringify({"success": false, "message": "data not updated"}));
            }
        } catch (err) {
            console.error("error executing query:", err);
            return new Response(JSON.stringify({"success": false, "message": "error executing query"}));
        } finally {
            client.end();
        }

        return new Response(JSON.stringify(body))


    } else {
        // user id or data are not validated
        return new Response(JSON.stringify({"success": false, "message": "user id or data are not validated"}));
    }

}

export {poster as POST}