'use strict';
const fs = require('fs-extra');
const path = require('path');
const prism = require('prismjs');

const demosGeneralPath = path.resolve(process.cwd(), 'packages/ngx-bootstrap-docs/src/components/demos');

(async () => {
    const folders = (await fs.readdir(demosGeneralPath, { withFileTypes: true })).filter(item => item.isDirectory());
    const arr = folders.map(async(folder) => {
        const componentsFolders = (await fs.readdir(`${demosGeneralPath}/${folder.name}`, {withFileTypes: true})).map(async (componentsFolder) => {
            if (componentsFolder.isDirectory()) {
                const files = (await fs.readdir(`${demosGeneralPath}/${folder.name}/${componentsFolder.name}`, {withFileTypes: true})).map(async (file) => {
                    const fileNameArray = file.name.toString().split('.');
                    if (fileNameArray[1] === 'tsx') {
                        const content = (await fs.readFile(`${demosGeneralPath}/${folder.name}/${componentsFolder.name}/${file.name}`, {encoding: 'utf8'}));
                        let htmlCode = `${content}`
                        htmlCode = prism.highlight(htmlCode, prism.languages.javascript, 'js');
                        await fs.writeFile(`${demosGeneralPath}/${folder.name}/${componentsFolder.name}/${fileNameArray[0]}.html`, htmlCode);
                    }
                });
                await Promise.all(files);
            }
        })
        await Promise.all(componentsFolders);
    })
    await Promise.all(arr);
})();
