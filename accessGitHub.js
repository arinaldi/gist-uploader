const axios = require('axios');
const colors = require('colors');

exports.postGist = function (post) {
  const GITHUB_URL = 'https://api.github.com/gists';

  axios.post(GITHUB_URL, post)
  .then((res) => {
    if (res.status === 201) {
      console.log(`Your gist is available at ${res.data.html_url}`);
    }
  })
  .catch(error => console.log(error.message.red));
};
