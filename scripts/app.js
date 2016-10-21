import GuardianAPIProxy from './modules/guardian-api-proxy';
import Tab from './modules/tab';
import TabPanelArticleList from './modules/tab-panel-list';

class App {
  constructor() {
    this._buildDynamicTab();
    this._enhanceExistingTab();
  }

  _enhanceExistingTab() {
    const triggerElement = document.querySelectorAll('.js-enhance-tab')[0];
    const targetTab = document.querySelectorAll('.js-enhance-tab-target')[0];

    triggerElement.addEventListener('click', (event) => {
      event.preventDefault();
      const tab = new Tab(targetTab.children[0]);
    });
  }

  _buildDynamicTab() {
    /* build tab component */
    const tab = new Tab();
    tab.renderTo(document.querySelectorAll('[data-module="tab"]')[0]);

    const desiredData = [
      {
        'page-size': 5,
        section: 'travel',
        title: 'Travel',
      },
      {
        'page-size': 5,
        section: 'football',
        title: 'Football',
      },
      {
        'page-size': 5,
        section: 'uk-news',
        title: 'UK News',
      }
    ];

    /* load each panel & append it to the tab component */
    desiredData.forEach((item) => {
      new GuardianAPIProxy()
        .fetch(item)
        .then((tabData) => {
          const content = new TabPanelArticleList({items: tabData}).render();
          tab.addPanel(item.title, item.section, content);
        });
    });
  }
}

new App();
