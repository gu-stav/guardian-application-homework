import qwest from 'qwest';

/*

  Super-Simple API abstraction

*/

class Proxy {
  constructor() {
    this.API_KEY = '9wur7sdh84azzazdt3ye54k4';
    this.API_BASE = 'https://content.guardianapis.com/search';
  }

  fetch(data) {
    const requestData = Object.assign(data, {'api-key': this.API_KEY});
    return qwest
      .get(this.API_BASE, requestData);
  }
}

export default Proxy;
