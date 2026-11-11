const http = require('http');
const fs = require('fs');

function post(data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth-test',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('1. Testing arbitrary credentials rejection...');
  const res1 = await post({ email: 'random@test.com', password: 'arbitrary_password' });
  console.log('Result 1:', res1.status, res1.data);

  console.log('\n2. Testing missing fields rejection...');
  const res2 = await post({ email: '' });
  console.log('Result 2:', res2.status, res2.data);

  console.log('\n3. Testing valid synthetic test credentials...');
  const res3 = await post({ email: 'demo.user@example.test', password: 'DEMO_ONLY_PASSWORD_123!' });
  console.log('Result 3:', res3.status, res3.data);

  console.log('\n4. Checking test-submissions.txt...');
  if (fs.existsSync('test-submissions.txt')) {
    const content = fs.readFileSync('test-submissions.txt', 'utf8');
    console.log('test-submissions.txt contents:\n' + content);
  } else {
    console.log('test-submissions.txt does not exist!');
  }
}

run().catch(console.error);
