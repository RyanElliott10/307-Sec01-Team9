import NetClient from "../NetClient";

test("delete works", () => {
  NetClient.delete("https//localhost:44300/api/beers/1");
});

test("post works", () => {
  NetClient.post("https//localhost:44300/api/beers/", {});
});
