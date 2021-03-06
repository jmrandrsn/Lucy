const docredux = require('docredux');
const buildDocs = () => {
  return docredux.build.json({
    destination: `${__dirname}/docs/`,
    source: `${__dirname}/docs/bundle.js`,
  });
};
const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel-minify');
const tinyLR = require('tiny-lr')();
const liveReload = require('connect-livereload');
const fs = require('fs');
const watch = require('node-watch');
const express = require('express');
const path = require('path');
const app = express();
const expressRoot = '/';
const expressPort = 8890;
const liveReloadPort = 35729;
const liveReloadStart = () => {
  app.use(liveReload());
  app.use(express.static(`${__dirname}/docs`));
  app.listen(expressPort);
  tinyLR.listen(liveReloadPort);
};
const notifyLiveReload = (evt, filename) => {
  const fileName = path.relative(expressRoot, filename);
  tinyLR.changed({
    body: {
      files: [fileName],
    },
  });
};
const copyFile = (start, end) => {
  fs.writeFileSync(end, fs.readFileSync(start).toString(), 'utf8');
};
const build = async () => {
  console.log('Build Start');
  const bundle = await rollup({
    input: './source/index.js',
  });
  await bundle.write({
    file: './build/bundle.js',
    format: 'umd',
    name: '$',
    sourceMap: true
  });
  const production = await rollup({
    input: './source/index.js',
    plugins: [
      babel({
        banner: `/* LUCY by ARITY 2.2.1 - ARITY.COMPANY - SENTIVATE.COM */`,
        comments: false,
      })
    ]
  });
  await production.write({
    file: './build/index.js',
    format: 'umd',
    name: '$',
    sourceMap: true
  });
  copyFile('./build/bundle.js', './docs/bundle.js');
  copyFile('./build/index.js', './docs/bundle.min.js');
  console.log('Build Complete');
  console.log('Docs Started');
  await buildDocs();
  console.log('Docs Complete');
  console.log('NPM Started');
  copyFile('./build/index.js', './npm/index.js');
  copyFile('./LICENSE', './npm/LICENSE');
  copyFile('./README.md', './npm/README.md');
  copyFile('./build/index.js', './node_modules/Lucy/index.js');
  console.log('NPM Complete');
  console.log('Build Complete');
};
build();
liveReloadStart();
watch('./source/', {
  recursive: true
}, async (evt, filename) => {
  await build();
  notifyLiveReload(evt, filename);
});
