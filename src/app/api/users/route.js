import {Client} from "pg";


async function poster(request) {
  // console.log(process.env.DATABASE_URL)
  const client = new Client(process.env.DATABASE_URL);
  // extract body from request
  const body = await request.json();
  // TODO: check email? and num_tel
  // console.log(body)
  const values = [body.email, body.num_tel, body.name, body.surname]

  await client.connect();
  var results = {}
  try {
    // results = await client.query("SELECT NOW()");
    const sql = 'INSERT INTO users(email, num_tel, name, surname) VALUES($1, $2, $3, $4) RETURNING id'
    results = await client.query(sql, values)
    console.log(results);
  } catch (err) {
    results = {}
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
  return new Response(JSON.stringify(results.rows));

}


export {poster as POST}