import axios from 'axios'

export interface Post {
  id: string
  content: string
  title: string
}

export const getPosts = (): Promise<Post[]> => {
  return axios({
    url: 'https://cnodejs.org/api/v1/topics',
    method: 'GET'
  }).then(res => {
    return res.data.data
  })
}
