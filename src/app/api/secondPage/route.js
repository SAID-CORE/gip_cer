async function poster(request){
    // extract body from request
    const body = await request.json();

    console.log("request body: ", body)
}

export {poster as POST}