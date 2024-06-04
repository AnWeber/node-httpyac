import { send, cli, store } from "httpyac";

async function sendHttp() {
  cli.initFileProvider();
  const httpFileStore = new store.HttpFileStore();

  const httpFile = await httpFileStore.parse(
    "foo.http",
    `
  GET https://httpbin.org/anything
  `,
    {}
  );

  httpFile.hooks.responseLogging.addHook("console", (response) =>
    console.info(response)
  );

  await send({
    httpFile,
  });
}

sendHttp();
