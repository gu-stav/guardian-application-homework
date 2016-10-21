import qwest from 'qwest';

class Proxy {
  constructor() {
    this.API_KEY = '9wur7sdh84azzazdt3ye54k4';
    this.API_BASE = 'http://content.guardianapis.com/search';
  }

  fetch(data) {
    const requestData = Object.assign(data, {'api-key': this.API_KEY});
    return qwest
      .get(this.API_BASE, requestData)
      .then((xhr, data) => {
        return data.response.results;
      });
  }
}

export default Proxy;
