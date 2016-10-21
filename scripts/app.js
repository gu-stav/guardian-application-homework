import GuardianAPIProxy from './modules/guardian-api-proxy';
import Tab from './modules/tab';

class App {
  constructor() {
    this._buildTabs();
  }

  _buildTabs() {
    /* build tab component */
    const tabTarget = document.querySelectorAll('[data-module="tab"]');
    const tab = new Tab(tabTarget[0]);

    const desiredData = [
      {
        section: 'travel',
        webTitle: 'Travel',
      },
      {
        section: 'football',
        webTitle: 'Football',
      },
      {
        section: 'uk-news',
        webTitle: 'UK News',
      }
    ];

    /* load each panel & append it to the tab component */
    desiredData.forEach((item) => {
      new GuardianAPIProxy()
        .fetch(item)
        .then((tabData) => {
          tab.addPanel({
            items: tabData,
            section: item.section,
            title: item.webTitle,
          });
        });
    });
  }
}

new App();
