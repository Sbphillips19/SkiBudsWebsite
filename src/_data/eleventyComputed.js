const { pageMetadata } = require('../../lib/seo');

module.exports = {
  seo: data => (data.layout && data.page.url ? pageMetadata(data) : undefined),
};
