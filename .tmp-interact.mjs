import fs from "node:fs";

const OUT = "d:/book/ស្នាដៃរបស់ខ្ញុំ/Frontend/Pro_3/foodie/.shots";
const APP = "http://localhost:5183";
const CDP = "http://127.0.0.1:9222";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const list = await (await fetch(`${CDP}/json/list`)).json();
const target = list.find((t) => t.type === "page");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res);
  ws.addEventListener("error", rej);
});
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const p = pending.get(m.id);
    pending.delete(m.id);
    m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const i = ++id;
    pending.set(i, { resolve, reject });
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});

const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return r.result?.value;
};

const goto = async (path) => {
  await send("Page.navigate", { url: `${APP}${path}` });
  await sleep(1800);
};

const shot = async (name) => {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
  console.log("saved", name);
};

await goto("/datapro");
console.log(
  "add click:",
  await evaluate(`(() => {
    const b = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Add');
    if (!b) return 'not found';
    b.click();
    return 'clicked';
  })()`)
);
await sleep(700);
await shot("11-toast");

await goto("/cart");
await shot("12-cart-filled");
console.log(
  "cart rows:",
  await evaluate(`document.querySelectorAll('li').length`)
);

// Mobile home viewport
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await goto("/");
await shot("13-home-mobile-top");
await evaluate("window.scrollTo(0, 900)");
await sleep(700);
await shot("14-home-mobile-scroll1");

// Mobile nav sheet
await evaluate("window.scrollTo(0,0)");
await evaluate(
  `[...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Open menu')?.click()`
);
await sleep(600);
await shot("15-mobile-menu-sheet");

ws.close();
