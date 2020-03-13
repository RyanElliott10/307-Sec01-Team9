import NetClient from "../NetClient";

test("get works", async () => {
  const originalError = console.error;
  console.error = jest.fn();
  
  await NetClient.get("http://jsonplaceholder.typicode.com/todos").then(data =>
    expect(data).toBeTruthy()
  );

  console.error = originalError;
}, 30000);

test("delete works", async () => {
  const originalError = console.error;
  console.error = jest.fn();
  
  await NetClient.delete(
    "http://jsonplaceholder.typicode.com/todos"
  ).then(data => expect(data).toBeTruthy());

  console.error = originalError;
});

test("post works", async () => {
  const originalError = console.error;
  console.error = jest.fn();
  
  await NetClient.post(
    "http://jsonplaceholder.typicode.com/todos",
    {}
  ).then(data => expect(data).toBeTruthy());
  
  console.error = originalError;
});
