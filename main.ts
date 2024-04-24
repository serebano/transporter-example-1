import {
  App,
  IncomingTextStream,
  OutgoingTextStream,
} from "@clappcodes/transporter";

async function receive(request: Request) {
  const stream = new IncomingTextStream(request);

  for await (const chunk of await stream.ready) {
    console.log("(client)", chunk);
  }

  return new Response();
}

async function send(request: Request) {
  const stream = new OutgoingTextStream(request);

  stream.write("Hello from server");
  // new Response(stream.readable)
  return stream.response();
}

const app = new App();

app.post("/foo", receive);
app.get("/foo", send);

app.use(App.static());

app.serve({ port: 3000 });
