class NetClient {
  static async get(url) {
    console.log("FETCHING FROM", url);
    return await fetch(url).then(res => res.json());
  }

  static async post(url, data) {
    console.log("JSON:", JSON.stringify(data));
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

  static async delete(url) {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  }
}

export default NetClient;
