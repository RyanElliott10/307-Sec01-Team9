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
  static async get(url: string) {
    return await fetch(url);
  }

  static async post(url: string, data: Object) {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }
}

export default NetClient;
