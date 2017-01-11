const fs = require('fs');

const files = {
  initial: 'demo/dist/index.html',
  generated: 'demo/dist/index-bs4.html'
};

const toReplace = [
  {
    from: '<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">',
    to: `<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="assets/css/glyphicons.css">`
  }, {
    from: '<script src="assets/js/prettify.min.js"></script>',
    to: '<script src="assets/js/prettify.min.js"></script>\r\n  <!-- Enable bootstrap 4 theme -->\r\n  <script>window.__theme = \'bs4\';</script>'
  }
];

fs.readFile(files.initial, 'utf-8', (err, file) => {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  if (file.length === 0) {
    console.error('File is empty');
    return process.exit(1);
  }

  toReplace.forEach(pair => {
    file = file.replace(pair.from, pair.to);
  });

  fs.open(files.generated, 'w', (err, newFileDescriptor) => {
    if (err) {
      console.error(err);
      return process.exit(1);
    }

    if (!newFileDescriptor) {
      console.error('File creation error');
      return process.exit(1);
    }

    fs.writeFile(newFileDescriptor, file, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }
      console.log('File successfully created');
    })
  });
});
