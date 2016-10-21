import GuardianAPIProxy from './modules/guardian-api-proxy';
import Tab from './modules/tab';
import TabPanelArticleList from './modules/tab-panel-list';
import {DOMready} from './utils';

class App {
  constructor() {
    this._buildDynamicTab();
    this._enhanceExistingTab();
  }

  // Shows how progressive enhancement can be done with that
  _enhanceExistingTab() {
    const targetTab = document.querySelectorAll('.js-enhance-tab-target')[0];
    const tab = new Tab(targetTab.children[0]);
  }

  // Shows how remote content get's fetched, rendered and added
  _buildDynamicTab() {
    /* build tab component */
    const tab = new Tab();
    tab.renderTo(document.querySelectorAll('[data-module="tab"]')[0]);

    const desiredData = [
      {
        'page-size': 5,
        section: 'travel',
      },
      {
        'page-size': 5,
        section: 'football',
      },
      {
        'page-size': 5,
        section: 'uk-news',
      }
    ];

    /* load each panel & append it to the tab component */
    desiredData.forEach((item) => {
      new GuardianAPIProxy()
        .fetch(item)
        .then((xhr, data) => {
          const content = new TabPanelArticleList({
            items: data.response.results
          }).render();
          const tabTitle = data.response.results[0].sectionName;
          const tabId = item.section;
          tab.addPanel(tabTitle, tabId, content);
        });
    });
  }
}

DOMready(() => {
  new App();
});
