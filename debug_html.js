const https = require('https');

https.get('https://mat-oauhc.vercel.app', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    // Find the INITIAL html body (not streaming chunks)
    const initialHtmlEnd = data.indexOf('self.__next_f');
    const initialHtml = initialHtmlEnd > -1 ? data.substring(0, initialHtmlEnd) : data;
    
    console.log('=== FIRST 3000 CHARS OF HTML (before streaming) ===');
    console.log(initialHtml.substring(0, 3000));
    console.log('\n=== VIEWPORT IN INITIAL HTML? ===', initialHtml.toLowerCase().includes('viewport'));
  });
}).on('error', (e) => console.error(e));
