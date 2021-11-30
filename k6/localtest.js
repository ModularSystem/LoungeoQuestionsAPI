import http from 'k6/http';
import { sleep } from 'k6';


export const options = {
  vus: 10,
  duration: '10s',

  // thresholds: {
  //   'http_req_duration{type:oneProduct}': ['p(95)<500'],
  //   'http_req_duration{type:answers}': ['p(95)<500'],
  //   'http_req_duration{type:answersPost}': ['p(95)<500'],
  //   'http_req_duration{type:questionsPost}': ['p(95)<500'],
  // },
  // stages: [
  //   { duration: '30s', target: 250 },
  //   { duration: '30s', target: 500 },
  //   { duration: '30s', target: 1000 },
  //   { duration: '30s', target: 2000 },
  //   { duration: '40s', target: 0 },
  // ],

};

export default () => {
  const randomId = Math.floor(Math.random() * 500000)
  // console.log(randomId)
  http.get(`http://localhost:3000/qa/questions/?product_id=${randomId}`, { tags: { type: 'oneProduct' } });
  // console.log(res.body)
  // http.get(`http://localhost:3000/qa/questions/${randomId}/answers`, { tags: { type: 'answers' } });
  // http.post(`http://localhost:3000/qa/questions/${randomId}/answers`, {body: 'hi', name:'hi', email:'hi', productID: 61576}, { tags: { type: 'questionsPost' } });


  // sleep(1);
  // http.get('http://localhost:8080/qa/questions/216589/answers');
};
