/**
 * Example GET request:
 *
 *    NetClient.get("http://jsonplaceholder.typicode.com/todos")
 *      .then(res => res.json())
 *      .then(data => console.log(data))
 *      .catch(console.log);
 *
 * Example POST request:
 *    NetClient.post("https://httpbin.org/post", { test: "hola" })
 *      .then(res => res.json())
 *      .then(data => console.log(data))
 *      .catch(console.log);
 */

class NetClient {
  static async get(url) {
    return await fetch(url);
  }

  static async post(url, data) {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(console.log);
  }

  static async dummyGetData() {
    // "localhost:44300/api/beerstyles"
    // "localhost:44300/api/beercategories"
  }
}

export default NetClient;
