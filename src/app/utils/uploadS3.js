export default function uploadS3(url, file, progressCallback) {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', url, true);

    // Set up a handler for the progress event
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressCallback(percentComplete); // Call the onProgress callback with the progress value
        }
    };

    // Set up a handler for the load event
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Upload successful:', xhr.responseText);
        } else {
            console.error('Upload error:', xhr.statusText);
        }
    };

    // Set up a handler for the error event
    xhr.onerror = function () {
        console.error('Upload error:', xhr.statusText);
    };

    // Send the file
    xhr.send(file);
}