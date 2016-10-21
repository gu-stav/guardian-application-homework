import delegate from 'delegate-events';
import TabPanel from './tab-panel';
import TabTitle from './tab-title';
import {addClass, htmlToDOM} from '../utils';

class TabComponent {
  constructor(element) {
    this._items = [];

    if (element) {
      this.element = element;
      this.collectPanels();
    } else {
      this.element = this.render();
    }

    this._addBindings();
    addClass(this.element, 'tab--is-initialized');
  }

  addPanel(titleText, id, content) {
    const title = new TabTitle({
      id: id,
      title: titleText,
    });

    const panel = new TabPanel({
      title: title,
      content: content,
    });

    this._addPanel(panel);
    this.getHeaderContainer().appendChild(panel.title.element);
    this.element.appendChild(panel.element);
  }

  _addPanel(panel) {
    this._items.push(panel);

    // activate the first item
    if (this._items.length === 1) {
      panel.enable();
    }
  }

  collectPanels() {
    [].forEach.call(this.getHeaderContainer().children, (item) => {
      const title = new TabTitle({
        element: item,
      });

      const panelElement = this.element.querySelectorAll(`[aria-labelledby="${title.id}"]`)[0];

      const panel = new TabPanel({
        element: panelElement,
        title: title,
        content: panelElement.innerHTML,
      });

      this._addPanel(panel);
    });
  }

  getHeaderContainer() {
    return this.element.querySelectorAll('.tab__header')[0];
  }

  renderTo(target) {
    target.appendChild(this.element);
  }

  _addBindings() {
    delegate.bind(this.element, '.tab__header-item-title', 'click', (event) => {
      const targetId = event.target.id;

      this._items.forEach((item) => {
        if (item.title.id === targetId) {
          item.enable();
        } else {
          item.disable();
        }
      });
    });
  }

  render() {
    return htmlToDOM(`<div class="tab" role="tablist" aria-live="polite">
      <ul class="tab__header"></ul>
    </div>`);
  }
}

export default TabComponent;
