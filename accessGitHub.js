const EventEmitter = require('events');
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
}, (error) => {
  return Promise.reject(error);
});

exports.postGist = function (post) {
  const GITHUB_URL = 'https://api.github.com/gists';
  myEmitter.emit('start');

  axios.post(GITHUB_URL, post)
  .then((res) => {
    if (res.status === 201) {
      myEmitter.emit('end');
      console.log(`Your gist is available at: ${res.data.html_url}`);
    }
  })
  .catch(error => console.log(error.message.red));
};
