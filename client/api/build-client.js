import axios from 'axios'

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // server
    return axios.create({
      // baseURL: 'http://ingress-nginx-controller.kube-system.svc.cluster.local',
      baseURL: 'http://ticketing.drew-chorney.com/',
      headers: req.headers,
    })
  } else {
    // browser
    return axios.create({
      baseURL: '/'
    })
  }
};
