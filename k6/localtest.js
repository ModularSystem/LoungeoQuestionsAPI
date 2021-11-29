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
  http.get('http://localhost:3000/qa/questions/?product_id=61575', { tags: { type: 'oneProduct' } });
  // http.get('http://localhost:3000/qa/questions/216590/answers', { tags: { type: 'answers' } });
  // http.post('http://localhost:3000/qa/questions/216590/answers', {body: 'hi', name:'hi', email:'hi', productID: 61576}, { tags: { type: 'questionsPost' } });
  // http.post('http://localhost:8080/qa/questions/216590/answers', { tags: { type: 'answersPost' } });

  // sleep(1);
  // http.get('http://localhost:8080/qa/questions/216589/answers');
};
