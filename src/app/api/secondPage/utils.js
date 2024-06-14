import {Client} from "pg";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";

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
    if (!data.hasOwnProperty("user_type")) {
        missingList.push("user_type")
    }
    if (!data.hasOwnProperty("property_type")) {
        missingList.push("property_type")
    }

    if (missingList.length > 0) {
        return {"success": false, "message": "missing parameters " + missingList.toString()}
    } else {
        return {"success": true, "message": "data validated correctly"}
    }
}

async function generatePresignedUrl() {
    const client = new S3Client({region: "eu-central-1"});
    const putObjectParams = {
        Bucket: "bucketprova2",
        Key: "object-key",
    };

    const expiresIn = 1; // 1 minute

    // Generate presigned URL for uploading the object
    const putObjectCommand = new PutObjectCommand(putObjectParams);
    return  await getSignedUrl(client, putObjectCommand, {expiresIn});
}

export {checkUserExistence, validateSecondFormData}