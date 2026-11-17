import fs from "node:fs";

const OUT = process.env.SHOT_DIR || "/tmp/foodie-shots";
const APP = "http://localhost:5183";
const CDP = "http://127.0.0.1:9222";
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const list = await (await fetch(`${CDP}/json/list`)).json();
const target = list.find((t) => t.type === "page");
if (!target) throw new Error("no page target");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener("open", resolve);
  ws.addEventListener("error", reject);
});

let id = 0;
const pending = new Map();
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const msgId = ++id;
    pending.set(msgId, { resolve, reject });
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");

const consoleErrors = [];
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.method === "Runtime.exceptionThrown") {
    consoleErrors.push(
      msg.params.exceptionDetails?.exception?.description ||
        msg.params.exceptionDetails?.text
    );
  }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description).join(" "));
  }
});

const setViewport = async (width, height, mobile = false) => {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
};

const goto = async (path) => {
  await send("Page.navigate", { url: `${APP}${path}` });
  await sleep(1800);
};

const shot = async (name, full = false) => {
  const params = { format: "png", captureBeyondViewport: full };
  if (full) {
    const { cssContentSize } = await send("Page.getLayoutMetrics");
    params.clip = {
      x: 0,
      y: 0,
      width: cssContentSize.width,
      height: Math.min(cssContentSize.height, 3200),
      scale: 1,
    };
  }
  const { data } = await send("Page.captureScreenshot", params);
  fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  console.log("saved", name);
};

// Log in by seeding localStorage on the origin, then reload.
await setViewport(1440, 1000);
await goto("/user");
await send("Runtime.evaluate", {
  expression: `localStorage.setItem('foodie_current_user', JSON.stringify({id:1,firstName:'Sokha',lastName:'Chan',email:'sokha@example.com',phone:'+855 12 345 678',createdAt:new Date().toISOString()})); localStorage.setItem('foodie_users', JSON.stringify([]));`,
});

const routes = [
  ["/", "01-home", false],
  ["/datapro", "02-menu", false],
  ["/cart", "03b-cart-top", false],
  ["/product-details/1", "04-detail", false],
  ["/profile", "05-profile", false],
  ["/about", "06-about", false],
  ["/contact", "07b-contact-top", false],
  ["/user", "08-login", false],
];

for (const [path, name, full] of routes) {
  await goto(path);
  await shot(name, full);
}

// Mobile
await setViewport(390, 844, true);
await goto("/");
await shot("09-home-mobile", true);
await goto("/datapro");
await shot("10-menu-mobile", false);

console.log("console errors:", JSON.stringify(consoleErrors, null, 2));
ws.close();
