import {Client} from "pg";

async function getter(request, {params}){
  console.log(params.user_id)
  return new Response(params.user_id)
}

export {getter as GET}