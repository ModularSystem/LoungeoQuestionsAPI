import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',

  thresholds: {
    'http_req_duration{type:oneProduct}': ['p(95)<500'],
  },

};

export default () => {
  http.get('http://localhost:8080/qa/questions/?product_id=61575', { tags: { type: 'oneProduct' } });

  sleep(1);
  // http.get('http://localhost:8080/qa/questions/216589/answers');
};
