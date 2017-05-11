const EventEmitter = require('events');
const readlineSync = require('readline-sync');
const axios = require('axios');
const colors = require('colors');

const myEmitter = new EventEmitter();

myEmitter.on('start', () => {
  console.log('Preparing request...');
});
myEmitter.on('working', () => {
  console.log('Sending request...');
});
myEmitter.on('end', () => {
  console.log('Request completed'.green);
});

axios.interceptors.request.use((config) => {
  myEmitter.emit('working');
  return config;
}, error => Promise.reject(error));

exports.postGist = function (post) {
  const GITHUB_URL = 'https://api.github.com/gists';
  const CONN_FAILED_MSG = 'Conection failed. Do you want to retry?';

  myEmitter.emit('start');
  axios.post(GITHUB_URL, post)
  .then((res) => {
    if (res.status === 201) {
      myEmitter.emit('end');
      console.log(`Your gist is available at: ${res.data.html_url}`);
    }
  })
  .catch((error) => {
    console.log(error.message.red);

    if (readlineSync.keyInYN(CONN_FAILED_MSG)) {
      exports.postGist(post);
    } else {
      console.log('Request canceled'.red);
    }
  });
};
