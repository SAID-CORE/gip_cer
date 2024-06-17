import {parsePhoneNumber, isValidPhoneNumber} from "libphonenumber-js";
import {v5} from 'uuid';
import {fileURLToPath} from "url";

async function validateFirstFormData(data) {
    // checking for missing mandatory fields
    let missingList = []
    if (!data.hasOwnProperty("name")) {
        missingList.push("name")
    }
    if (!data.hasOwnProperty("surname")) {
        missingList.push("surname")
    }
    if (!data.hasOwnProperty("num_tel")) {
        missingList.push("num_tel")
    }

    if (missingList.length > 0) {
        return {"success": false, "message": "missing parameters " + missingList.toString()}
    } else {
        // phone number validation
        try {
            const phoneNumber = await parsePhoneNumber(data.num_tel, "IT")
            console.log("PHONE: ", phoneNumber)
            if (!phoneNumber.isValid()) {
                return {"success": false, "message": `invalid phone number ${phoneNumber.number}`}
            } else {
                return {"success": true, "message": "data validated correctly"}
            }

        } catch (e) {
            return {"success": false, "message": "error parsing phone number " + e}
        }
    }
}

async function genUuid5(name, namespace) {
    return v5(name, namespace);
}

export {validateFirstFormData, genUuid5}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
}