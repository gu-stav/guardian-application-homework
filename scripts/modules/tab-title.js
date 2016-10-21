import {addClass, removeClass, htmlToDOM} from '../utils';

/*

  Panel-Title

*/

class TabTitle {
  constructor(data) {
    this.activeClass = 'tab__header-item-title--is-active';

    if (data.element) {
      this.title = data.element.children[0].textContent;
      this.id = data.element.children[0].id;
    } else {
      this.title = data.title;
      this.id = data.id;
    }

    this.element = data.element || this.render();
  }

  getTrigger() {
    return this.element.children[0];
  }

  enable() {
    addClass(this.getTrigger(), this.activeClass);
  }

  disable() {
    removeClass(this.getTrigger(), this.activeClass);
  }

  render() {
    return htmlToDOM(`<li class="tab__header-item">
      <h2 class="tab__header-item-title" tabindex="0" id="${this.id}" aria-controls="${this.id}">
        ${this.title}
      </h2>
    </li>`);
  }
}

export default TabTitle;
