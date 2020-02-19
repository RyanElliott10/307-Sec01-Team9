/**
 * Example GET request:
 *
 *    NetClient.get("http://jsonplaceholder.typicode.com/todos")
 *      .then(data => console.log(data))
 *
 * Example POST request:
 *    NetClient.post("https://httpbin.org/post", { test: "hola" })
 *      .then(data => console.log(data))
 */

class NetClient {
  static async get(url) {
    return await fetch(url).then(res => res.json());
  }

  static async post(url, data) {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(console.log);
  }

  static async dummyGetData() {
    // "localhost:44300/api/beerstyles"
    // "localhost:44300/api/beercategories"
  }
}

export default NetClient;
