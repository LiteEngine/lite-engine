module.exports = {
  init: function(elementID, width, height) {
    var document = window.document,
      element = document.getElementById(elementID),
      style;

    if (!element) {
      element = document.createElement('div'),
      element.id = elementID;
      document.body.appendChild(element);
    }

    style = element.style;
    style.overflow = 'hidden';
    style.width = width + 'px';
    style.height = height + 'px';

    this.element = element;
    this.width = width;
    this.height = height;
  }
}
