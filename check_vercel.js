const https = require('https');

https.get('https://mat-oauhc.vercel.app', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const headMatch = data.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      console.log("HEAD CONTENTS:");
      const metas = headMatch[1].match(/<meta[^>]*>/gi);
      console.log(metas ? metas.join('\n') : 'No meta tags found in head');
      
      const text = headMatch[1];
      if (text.includes('viewport')) {
          console.log("\nFound viewport strings in head: Yes");
          const lines = text.split('\n').filter(l => l.includes('viewport'));
          console.log(lines.join('\n'));
      }
    } else {
      console.log("NO HEAD TAG FOUND");
      // Fallback
      const matches = data.match(/<meta[^>]*viewport[^>]*>/gi);
      if (matches) console.log("Meta viewports found:", matches);
    }
  });
});
