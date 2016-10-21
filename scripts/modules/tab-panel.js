import {addClass, removeClass, htmlToDOM} from '../utils';

class TabPanel {
  constructor(data) {
    this.data = data;
    this.active = false;
    this.activeClass = 'tab__panel--is-active';
    this.element = this.render();
  }

  addTitle(title) {
    this.title = title;
  }

  enable() {
    addClass(this.element, this.activeClass);
  }

  disable() {
    removeClass(this.element, this.activeClass);
  }

  render() {
    let panelContentMarkup = '';
    const activeClass = this.active === true ? this.activeClass : '';

    this.data.items.forEach((item) => {
      panelContentMarkup += `<li class="tab-list-item">
        <a href="${item.webUrl}"
           class="tab-list-item__title">${item.webTitle}</a>
      </li>`;
    });

    const viewString = `<div class="tab__panel ${activeClass}"
         role="tabpanel"
         id="tab-panel-content-${this.data.section}"
         aria-labelledby="tab-panel-trigger-${this.data.section}">
      <ol>${panelContentMarkup}</ol>
    </div>`;

    return htmlToDOM(viewString);
  }
}

export default TabPanel;
