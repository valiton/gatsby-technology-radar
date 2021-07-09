const sanitizeHtml = require('sanitize-html');

const keys = ['name', 'ring', 'quadrant', 'isNew', 'description'];

const checkFields = item =>
  keys.reduce(
    (carry, key) => carry && Object.prototype.hasOwnProperty.call(item, key),
    true
  );

exports.checkFields = checkFields;

const relaxedOptions = {
  allowedTags: [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'li',
    'ul',
    'br',
    'p',
    'u'
  ],
  allowedAttributes: {
    a: ['href']
  }
};

const restrictedOptions = {
  allowedTags: [],
  allowedAttributes: {},
  textFilter: function(text) {
    return text.replace(/&amp;/, '&');
  }
};

const cleanInput = item => {
  item.description = sanitizeHtml(item.description.trim(), relaxedOptions);
  item.name = sanitizeHtml(item.name.trim(), restrictedOptions);
  item.isNew = sanitizeHtml(item.isNew.trim(), restrictedOptions);
  item.ring = sanitizeHtml(item.ring.trim(), restrictedOptions);
  item.quadrant = sanitizeHtml(item.quadrant.trim(), restrictedOptions);

  return item;
};

exports.cleanInput = cleanInput;
