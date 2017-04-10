@angular/cli/models/webpack-config/browser.js:27
```js
    extraPlugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/));
    extraPlugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      // children: true,
      // async: true,
      minChunks: (module) => module.resource && (
        module.resource.indexOf('shared') !== -1 ||
        module.resource.indexOf('api-docs') !== -1
      )
    }));
```

ng2 v2.4 cli rc.0
```bash
./node_modules/.bin/ng build --stats-json -prod --aot
Hash: 0036453a794d99274a91                                                                 
Time: 78941ms
chunk    {0} main.6c01b04abc7365e0da7a.bundle.js (main) 288 kB {18} {19} [initial] [rendered]
chunk    {1} 1.1182ce9f3805a069a974.chunk.js 424 kB {0} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {2} 2.f20386c963cd4e5e6875.chunk.js 422 kB {0} {1} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {3} 3.cb2cd2fd8a7b2fddc708.chunk.js 459 kB {0} {1} {2} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {4} 4.9601ab3686abaa0e175d.chunk.js 450 kB {0} {1} {2} {3} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {5} 5.d1e064ff6a54b4f93829.chunk.js 400 kB {0} {1} {2} {3} {4} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {6} 6.6733f926d10185686097.chunk.js 404 kB {0} {1} {2} {3} {4} {5} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {7} 7.b7cd88e00c47694ed768.chunk.js 402 kB {0} {1} {2} {3} {4} {5} {6} {8} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {8} 8.eb23cc254bde6fc3ca4f.chunk.js 420 kB {0} {1} {2} {3} {4} {5} {6} {7} {9} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk    {9} 9.101c4932b90d6e0a9972.chunk.js 364 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {10} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk   {10} 10.fa4358bb27a7051e69c3.chunk.js 525 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {11} {12} {13} {14} {15} {16} {17} [rendered]
chunk   {11} 11.162ff6d854d15d1bfd0d.chunk.js 320 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {12} {13} {14} {15} {16} {17} [rendered]
chunk   {12} 12.d042c070c736ebc25d25.chunk.js 360 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {13} {14} {15} {16} {17} [rendered]
chunk   {13} 13.ea535405071532ca6bf3.chunk.js 369 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {14} {15} {16} {17} [rendered]
chunk   {14} 14.e35e4359e460a4667446.chunk.js 289 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {15} {16} {17} [rendered]
chunk   {15} 15.3733a8b3f221a0b297e3.chunk.js 302 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {16} {17} [rendered]
chunk   {16} 16.2ed6e9e4a8c78f6c4851.chunk.js 274 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {17} [rendered]
chunk   {17} 17.25993fefd7c4466f5a5e.chunk.js 198 kB {0} {1} {2} {3} {4} {5} {6} {7} {8} {9} {10} {11} {12} {13} {14} {15} {16} [rendered]
chunk   {18} vendor.3dbbd0f7273106f9954f.bundle.js (vendor) 1.66 MB [initial] [rendered]
chunk   {19} shared.ac291a23e7fb8f5af719.bundle.js (shared) 0 bytes [entry] [rendered]

```
