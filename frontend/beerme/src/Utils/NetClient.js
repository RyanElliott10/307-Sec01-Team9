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
