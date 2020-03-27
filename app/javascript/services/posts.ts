import axios from 'axios'

class Posts {
  static list(params: { limit, after, raw_json }) {
    return axios.get('https://www.reddit.com/top.json', { 
      params: params
    });
  }
}

export default Posts;
