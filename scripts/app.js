import GuardianAPIProxy from './modules/guardian-api-proxy';
import Tab from './modules/tab';
import TabPanelArticleList from './modules/tab-panel-list';

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
    const tab = new Tab();
    const fetchItemAndBuildTab = (section) => {
      const reqData = {
        'page-size': 5,
        section,
      };
      new GuardianAPIProxy()
        .fetch(reqData)
        .then((xhr, data) => {
          const content = new TabPanelArticleList({
            items: data.response.results
          }).render();
          const firstResult = data.response.results[0];
          tab.addPanel(firstResult.sectionName, firstResult.sectionId, content);
        });
    };

    tab.renderTo(renderTarget);
    ['travel', 'football', 'uk-news'].forEach(fetchItemAndBuildTab);
  }
}

export default App;
