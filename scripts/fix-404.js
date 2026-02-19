const fs = require('fs');
const path = require('path');

function fix404Html() {
  const distPath = path.join(__dirname, '../dist/apps/ngx-bootstrap');
  const indexPath = path.join(distPath, 'index.html');
  const notFoundPath = path.join(distPath, '404.html');

  // Check if files exist
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html not found at:', indexPath);
    process.exit(1);
  }

  if (!fs.existsSync(notFoundPath)) {
    console.error('❌ 404.html not found at:', notFoundPath);
    process.exit(1);
  }

  // Read both files
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const notFoundContent = fs.readFileSync(notFoundPath, 'utf8');

  // Extract script tags from index.html (everything after the last </script> before </body>)
  const scriptRegex = /<script[^>]*src="[^"]*\.(js|mjs)"[^>]*><\/script>/g;
  const scripts = indexContent.match(scriptRegex) || [];

  if (scripts.length === 0) {
    console.warn('⚠️ No script tags found in index.html');
    return;
  }

  // Check if 404.html already has these scripts
  const hasScripts = scripts.some(script => notFoundContent.includes(script));
  if (hasScripts) {
    console.log('✅ 404.html already has the required scripts');
    return;
  }

  // Insert scripts before </body> in 404.html
  const scriptsString = scripts.join('');
  const updatedNotFoundContent = notFoundContent.replace(
    '</body>',
    `${scriptsString}</body>`
  );

  // Write the updated 404.html
  fs.writeFileSync(notFoundPath, updatedNotFoundContent, 'utf8');

  console.log('✅ Successfully injected scripts into 404.html:');
  scripts.forEach(script => {
    const src = script.match(/src="([^"]+)"/)?.[1];
    console.log(`   📄 ${src}`);
  });
}

// Run the script
try {
  fix404Html();
} catch (error) {
  console.error('❌ Error fixing 404.html:', error.message);
  process.exit(1);
}

