/*

  Article List with a Panel

*/

class TabPanelArticleList {
  constructor(data) {
    this.data = data;
  }

  render() {
    let content = '';

    this.data.items.forEach((item) => {
      content += `<li class="tab-list-item">
        <a href="${item.webUrl}"
           class="tab-list-item__title">
          <span class="tab-list-item__date">
            ${item.webPublicationDate}
            <span class="visually-hidden">:</span>
          </span>

          ${item.webTitle}
        </a>
      </li>`;
    });

    return `<ol>${content}</ol>`;
  }
}

export default TabPanelArticleList;
