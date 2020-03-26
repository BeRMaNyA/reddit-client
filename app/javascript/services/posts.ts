import axios from 'axios'

class Posts {
  static list(params: { limit, raw_json } = { limit: 50, raw_json: 1 }) {
    return axios.get('https://www.reddit.com/top.json', { 
      params: params
    });
  }
}

export default Posts;
