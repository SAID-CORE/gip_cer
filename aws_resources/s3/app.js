async function handler(event, context) {
    console.log("event: ", JSON.stringify(event))
    console.log("context: ", JSON.stringify(context))

    event.Records.forEach(record => {
        console.log(typeof record);
        console.log(record);
        console.log("event object key: ", JSON.stringify(record.object.key))
    });

}

module.exports = {handler};