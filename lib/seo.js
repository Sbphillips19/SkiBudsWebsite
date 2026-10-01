const siteData = require('../src/_data/site.json');

function canonicalUrl(url, base = siteData.url) {
  let pathname = new URL(url, base).pathname;
  pathname = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (!path.extname(pathname) && !pathname.endsWith('/')) pathname += '/';
  return new URL(pathname, base).href;
}

const path = require('path');

function pageMetadata(data) {
  const { site, page } = data;
  const canonical = canonicalUrl(data.canonical || page.url, site.url);
  const title = `${data.seoTitle || data.title || site.name} — ${site.name}`;
  const description = data.description || site.description;
  const image = `${site.url}/images/WhistlerPeakView-og.webp`;
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const appId = `${site.url}/#app`;
  const breadcrumbItems = [{ name: 'Home', url: `${site.url}/` }];
  if (data.parentUrl) {
    breadcrumbItems.push({ name: data.parentTitle, url: canonicalUrl(data.parentUrl, site.url) });
  }
  if (page.url !== '/') breadcrumbItems.push({ name: data.title, url: canonical });

  const graph = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: site.name,
      legalName: site.company,
      url: `${site.url}/`,
      email: site.email,
      logo: `${site.url}/images/logo.png`,
      sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${site.url}/`,
      name: site.name,
      description: site.description,
      publisher: { '@id': organizationId },
      inLanguage: 'en',
    },
    {
      '@type': data.pageType || 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      primaryImageOfPage: { '@type': 'ImageObject', url: image },
      inLanguage: 'en',
      ...(data.lastModified && { dateModified: new Date(data.lastModified).toISOString() }),
      ...(data.productPage && { about: { '@id': appId } }),
      ...(page.url !== '/' && { breadcrumb: { '@id': `${canonical}#breadcrumb` } }),
    },
  ];

  if (page.url !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  if (data.productPage) {
    graph.push({
      '@type': 'MobileApplication',
      '@id': appId,
      name: site.name,
      url: `${site.url}/`,
      description: site.description,
      operatingSystem: 'iOS, Android',
      applicationCategory: 'SportsApplication',
      publisher: { '@id': organizationId },
    });
  }

  if (data.article) {
    graph.push({
      '@type': data.articleType || 'Article',
      '@id': `${canonical}#article`,
      headline: data.title,
      description,
      url: canonical,
      mainEntityOfPage: { '@id': `${canonical}#webpage` },
      image: [image],
      datePublished: new Date(data.date).toISOString(),
      dateModified: new Date(data.lastModified || data.date).toISOString(),
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      inLanguage: 'en',
    });
  }

  return {
    canonical,
    title,
    description,
    image,
    breadcrumbItems,
    structuredData: { '@context': 'https://schema.org', '@graph': graph },
  };
}

function jsonLd(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

module.exports = { canonicalUrl, pageMetadata, jsonLd };
