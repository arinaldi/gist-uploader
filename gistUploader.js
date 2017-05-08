const fs = require('fs');
const path = require('path');
const colors = require('colors');
const randomizer = require('./randomizer');
const accessGitHub = require('./accessGitHub');

function buildPost(dir, files) {
  const post = {
    description: randomizer.getDescription(),
    public: true,
    files: {},
  };

  files.reduce((acc, cur) => {
    const content = fs.readFileSync(`${dir}/${cur}`, 'utf8');
    acc.files[cur] = { content };
    return acc;
  }, post);
  accessGitHub.postGist(post);
}

function readFile(name) {
  buildPost(`${process.cwd()}`, [name]);
}

function readDirectory(dirName) {
  fs.readdir(dirName, (error, files) => {
    if (error) console.log(error.message.red);
    buildPost(dirName, files);
  });
}

function getInput() {
  const input = process.argv[2];

  if (path.extname(input) === '.txt') {
    readFile(input);
  } else if (fs.existsSync(input)) {
    readDirectory(input);
  } else {
    console.log('Invalid file or directory name. Try again.'.red);
  }
}

getInput();
