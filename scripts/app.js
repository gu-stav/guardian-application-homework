import GuardianAPIProxy from './modules/guardian-api-proxy';
import Tab from './modules/tab';

class App {
  constructor() {
    this._buildTab();
  }

  _buildTab() {
    /* build tab component */
    const tab = new Tab(document.querySelectorAll('[data-module="tab"]')[0]);

    const desiredData = [
      {
        section: 'travel',
        title: 'Travel',
      },
      {
        section: 'football',
        title: 'Football',
      },
      {
        section: 'uk-news',
        title: 'UK News',
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
            title: item.title,
          });
        });
    });
  }
}

new App();
