import {Client} from "pg";
import { checkUserExistence } from "./utils.js"

async function poster(request){
    // extract body from request
    const body = await request.json();

    // user id validation
    let response = await checkUserExistence(body.id)

    // user id is validated
    if(response){
        // client connection
        const client = new Client(process.env.DATABASE_URL);
        await client.connect();


    }else{
        // user id is not validated
        return new Response(JSON.stringify({"success": false, "message": "user id not found"}));
    }

}

export {poster as POST}