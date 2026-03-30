import https from 'https';

const apiKey = 'sk-mega-6c309f77db9167850e784c25d8f8f93b672b2173b4dd791aa5c31a5ff6bd4329';
const model = 'gemini-2.5-flash';

const data = JSON.stringify({
  model: model,
  messages: [
    {
      role: 'user',
      content: 'test'
    }
  ]
});

const options = {
  hostname: 'ai.megallm.io',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(responseData);
      console.log('\nAPI Response:');
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('\nRaw Response:');
      console.log(responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
