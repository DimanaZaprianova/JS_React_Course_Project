// Here is an example of a JavaScript function that makes a PUT request with a JSON payload and stringifies the data before sending it:

// Copy code
function putJSON(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
// You can then call this function and pass in the URL and data object that you want to send:

// Copy code
const url = 'https://example.com/api/update';
const data = { name: 'John Doe', age: 30 };
putJSON(url, data)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
// You can use this function in your code, but it is recommended to use a library like axios or superagent for http request handling, it will be easier to manage and handle errors.