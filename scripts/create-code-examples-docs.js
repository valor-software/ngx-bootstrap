'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const demosGeneralPath = path.resolve(process.cwd(), 'packages/ngx-bootstrap-docs/src/components/demos');



(async () => {
    const folders = (await fs.readdir(demosGeneralPath, { withFileTypes: true })).filter(item => item.isDirectory());
    const arr = folders.map(async(folder) => {
        const name = folder.name;
        const files = (await fs.readdir(`${demosGeneralPath}/${name}`, {withFileTypes: true})).map(async (file) => {
            const fileNameArray = file.name.toString().split('.');
            console.log(fileNameArray)
            if (fileNameArray[1] === 'tsx') {
                const content = (await fs.readFile(`${demosGeneralPath}/${name}/${file.name}`, {encoding: 'utf8'}));
                const htmlCode = `
<pre className="prettyprint linenums lang-js">
${content}
</pre>
`
                console.log(htmlCode.toString());
const ex = htmlCode.replace(escapeTestNoEncode, getEscapeReplacement);
                const resultContent = 'const code = ' + `"${ex}"`;
                const resultFileName = `${fileNameArray[0]}-demo-code.ts`;
                await fs.writeFile(`${demosGeneralPath}/${name}/${resultFileName}`, resultContent);
                // console.log(result_content);
            }
            // console.log(extension);
        })
        await Promise.all(files);
    })
    await Promise.all(arr);
})();

const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
const escapeTest = /[&<>"']/;
const escapeReplace = /[&<>"']/g;
const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;



