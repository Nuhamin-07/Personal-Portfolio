const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('id="projects"');
    if (idx !== -1) {
      console.log('FOUND id="projects":');
      console.log(data.substring(idx - 50, idx + 600));
    } else {
      console.log('NOT FOUND id="projects"');
    }
  });
});
