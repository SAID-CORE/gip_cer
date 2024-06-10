import {isValidPhoneNumber} from "libphonenumber-js";
import {fileURLToPath} from "url";

async function validateFirstFormData(data){
    // checking for missing mandatory fields
    let missingList = []
    if (!data.hasOwnProperty("name")){
        missingList.push("name")
    }
    if(!data.hasOwnProperty("surname")){
        missingList.push("surname")
    }
    if(!data.hasOwnProperty("num_tel")){
        missingList.push("num_tel")
    }

    if (missingList.length > 0) {
        return {"success": false, "message": "missing parameters " + missingList.toString()}
    }else{
        // phone number validation
        const region = "IT"
        const phoneNumber = data.num_tel

        if (!isValidPhoneNumber(phoneNumber, region)){
            return {"success": false, "message": "invalid phone number " + phoneNumber}
        }else{
            return {"success": true, "message": "data validated correctly"}
        }

    }
}

export {validateFirstFormData}

// if (process.argv[1] === fileURLToPath(import.meta.url)){
//     let data ={"Nome": "Giacomo", "Cognome": "Pistis", "Telefono": "3479731426"};
//     let response = await validateFirstFormData(data)
//     console.log(response)
// }