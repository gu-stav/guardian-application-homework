import {addClass, removeClass, htmlToDOM} from '../utils';

/*

  Panel

*/

class TabPanel {
  constructor(data) {
    this.title = data.title;
    this.activeClass = 'tab__panel--is-active';
    this.element = data.element || this.render();
    this.element.innerHTML = data.content || '';
  }

  enable() {
    addClass(this.element, this.activeClass);
    this.title.enable();
  }

  disable() {
    removeClass(this.element, this.activeClass);
    this.title.disable();
  }

  render() {
    return htmlToDOM(`<div class="tab__panel" role="tabpanel" id="panel-${this.title.id}" aria-labelledby="${this.title.id}"></div>`);
  }
}

export default TabPanel;
