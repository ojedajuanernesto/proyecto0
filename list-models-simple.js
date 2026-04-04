const https = require('https');
const key = 'AIzaSyDdGSAyuF8p5wLKg13u1JM9guBoh_FZXtA';

https.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const models = JSON.parse(data);
      if (models.models) {
        models.models.forEach(m => console.log(m.name));
      } else {
        console.log(JSON.stringify(models, null, 2));
      }
    } catch(e) {
      console.log(data);
    }
  });
}).on('error', (err) => {
  console.error(err.message);
});
