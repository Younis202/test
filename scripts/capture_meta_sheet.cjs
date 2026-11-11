const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const port = 9222;
  
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=412,915',
    'http://localhost:5174'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const tabs = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const wsUrl = tabs[0].webSocketDebuggerUrl;
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const cb = pending.get(msg.id);
      pending.delete(msg.id);
      cb(msg.result);
    }
  };

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');
  await send('Runtime.enable');

  // Wait 1 second for the bottom sheet to slide up smoothly
  await new Promise(r => setTimeout(r, 1200));

  // Capture screenshot with the Meta Bottom Sheet active
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('meta_bottom_sheet_active.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved meta_bottom_sheet_active.png!');

  // Now dismiss the bottom sheet by clicking the close handle or Cancel button
  await send('Runtime.evaluate', {
    expression: `
      const buttons = [...document.querySelectorAll('button')];
      const cancelBtn = buttons.find(b => b.textContent.includes('Cancel'));
      if (cancelBtn) cancelBtn.click();
    `
  });

  // Wait for the slide down animation (350ms)
  await new Promise(r => setTimeout(r, 450));

  // Capture screenshot with the Bottom Sheet dismissed
  const shot2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('meta_bottom_sheet_dismissed.png', Buffer.from(shot2.data, 'base64'));
  console.log('Saved meta_bottom_sheet_dismissed.png!');

  ws.close();
  chrome.kill();
}

run().catch(console.error);
