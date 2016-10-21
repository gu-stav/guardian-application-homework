export function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
};

export function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    const regex = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
    el.className = el.className.replace(regex, ' ');
  }
};

export function htmlToDOM(html) {
  var fakeContainer = document.createElement('div');
  fakeContainer.innerHTML = html;
  return fakeContainer.firstChild;
};

