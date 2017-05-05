const axios = require('axios');

const GITHUB_URL = 'https://api.github.com/gists';
const testPost = {
  description: 'tony test',
  public: true,
  files: {
    'file1.txt': {
      content: 'The quick brown fox jumps over the lazy dog',
    },
    'file2.txt': {
      content: '12345',
    },
  },
};

axios.post(GITHUB_URL, testPost)
.then((res) => {
  if (res.status === 201) {
    console.log(`Your gist is available at ${res.data.html_url}`); // eslint-disable-line no-console
  }
})
.catch((error) => {
  console.log(error); // eslint-disable-line no-console
});
