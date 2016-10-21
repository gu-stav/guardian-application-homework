class TabPanelArticleList {
  constructor(data) {
    this.data = data;
  }

  render() {
    let panelContentMarkup = '';

    this.data.items.forEach((item) => {
      panelContentMarkup += `<li class="tab-list-item">
        <a href="${item.webUrl}"
           class="tab-list-item__title">${item.webTitle}</a>
      </li>`;
    });

    return `<ol>${panelContentMarkup}</ol>`;
  }
}

export default TabPanelArticleList;
