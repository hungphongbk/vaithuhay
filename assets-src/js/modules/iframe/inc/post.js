import qs from 'query-string'

export default (url, data) => new Promise(resolve => {
  const req = new XMLHttpRequest();
  req.onload = ({target}) => resolve(target.response);
  req.open('POST', url, true)
  req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  req.responseType = 'json';
  req.send(qs.stringify(data));
})
