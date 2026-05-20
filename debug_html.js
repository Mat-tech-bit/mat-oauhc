const https = require('https');

https.get('https://mat-oauhc.vercel.app', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const initialHtmlEnd = data.indexOf('self.__next_f');
    const initialHtml = initialHtmlEnd > -1 ? data.substring(0, initialHtmlEnd) : data;
    
    // Count viewport metas
    const viewportMatches = initialHtml.match(/name="viewport"/gi) || [];
    console.log('Number of viewport meta tags:', viewportMatches.length);
    
    // Show all viewport metas
    const allMetas = initialHtml.match(/<meta[^>]*viewport[^>]*>/gi) || [];
    allMetas.forEach(m => console.log('VIEWPORT TAG:', m));
    
    // Show CSS chunk filename to detect cache
    const cssChunk = initialHtml.match(/href="\/_next\/static\/chunks\/([^"]+\.css)"/);
    console.log('CSS chunk (to detect deploy):', cssChunk ? cssChunk[1] : 'not found');
  });
}).on('error', (e) => console.error(e));
