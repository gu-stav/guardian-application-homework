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
    const renderTarget = document.querySelectorAll('[data-module="tab"]')[0];
    const tab = new Tab().renderTo(renderTarget);
    const fetchItemAndBuildTab = (item) => {
      const requestData = {
        'page-size': 5,
        section: item,
      };

      new GuardianAPIProxy()
        .fetch(requestData)
        .then((xhr, data) => {
          const content = new TabPanelArticleList({
            items: data.response.results
          }).render();
          const tabTitle = data.response.results[0].sectionName;
          const tabId = requestData.section;
          tab.addPanel(tabTitle, tabId, content);
        });
    };

    ['travel', 'football', 'uk-news'].forEach(fetchItemAndBuildTab);
  }
}

DOMready(() => {
  new App();
});
