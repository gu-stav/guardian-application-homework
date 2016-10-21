import {addClass, removeClass, htmlToDOM} from '../utils';

class TabTitle {
  constructor(data) {
    this.data = data;
    this.activeClass = 'tab__header-item--is-active';
    this.template = `<li class="tab__header-item">
      <h2 class="tab__header-item-title"
          tabindex="0"
          aria-controls="tab__panel"
          id="tab-panel-trigger-${this.data.section}"
          aria-controls="tab-panel-content-${this.data.section}">
        ${this.data.title}
      </h2>
    </li>`;
    this.element = htmlToDOM(this.template);
    this._addBindings();
  }

  addPanel(panel) {
    this.panel = panel;
  }

  _addBindings() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      this.enable();
    });
  }

  enable(options) {
    addClass(this.element, this.activeClass);

    if (!options || options && (options.omitEvent !== true)) {
      this.onStateChange(this);
    }
  }

  disable(options) {
    removeClass(this.element, this.activeClass);
    if (!options || options && (options.omitEvent !== true)) {
      this.onStateChange(this);
    }
  }
}

export default TabTitle;
