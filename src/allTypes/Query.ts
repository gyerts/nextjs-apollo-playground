import {objectType, queryType, stringArg} from '@nexus/schema';

function routingConfig () {
  return [
    {
      pathRegex: '^.*\\/c\\/([^\\?]+)(\\?.*)*$',
      // type: 'shop-category',
      CMSPageType: 'CategoryPage',
      CMSCode: '*' // TODO: support *1 *2 to support dynamic multi parts  http:/myshop.com/p/Part1/Part2
      // CMSPageId: 'homepage'
    },
    {
      pathRegex: '^.*\\/p\\/([^\\?]+)(\\?.*)*$',
      CMSPageType: 'ProductPage',
      CMSCode: '*'
      // type: 'shop-product',
      // CMSPageId: 'homepage'
    },
    {
      pathRegex: '^.*\\/search\\/\\?q=([^\\?]+)(\\?.*)*$',
      // type: 'shop-search',
      CMSPageId: 'search'
    },
    {
      pathRegex: '^/(\\?.*)*$',
      // type: 'shop-cms',
      layout: 'HomepageWCITemplate',
      CMSPageId: 'homepage'
    },
    {
      pathRegex: '^/([^\\?]+)(\\?.*)*$',
      // type: 'shop-cms2',
      CMSPageId: '*' // other cms-pages
    }
  ];
}

function convertPage(page) {
  page.contentSlots = page.contentSlots.contentSlot.map(slot => {
    slot.components = slot.components.component.map(comp => {
      if (comp.container === `true`) {
        const inner = Object.values(comp.components).sort(
          // eslint-disable-next-line id-length
          (a: any, b: any) => parseInt(a.sequence, 0) - parseInt(b.sequence, 0)
        );
        inner.forEach((iComp: any) => {
          if (iComp.products) {
            iComp.products = Object.keys(iComp.products)
            // eslint-disable-next-line id-length
              .sort((a, b) => {
                const getSeq = key => {
                  const parts = key.split('_');
                  return parts[1] ? parseInt(parts[1], 0) : 0;
                };
                return getSeq(a) - getSeq(b);
              })
              .map(key => iComp.products[key]);
          }
        });
        comp.components = inner;
      }
      return comp;
    });
    return slot;
  });
  return page;
}

const pageHybrisRequest = async (root, {id, CMSPageType, CMSCode}, ctx) => {
  const url = 'https://api-dev.wowldn.co.il/occ/v2/wci/cms/pages';
  const params: any = {
    fields: 'FULL',
    pageType: CMSPageType || `ContentPage`
  };
  if (id) params.pageLabelOrId = id;
  if (CMSCode) params.code = CMSCode;

  try {
    const res = await fetch(url);
    return convertPage(await res.json());
  } catch (ex) {
    if (ex.message.includes('404')) {
      // in case page for slug not found/not defined, should return empty cms data.
      return {};
    }
    throw ex;
  }
};

// async page(obj, { id, CMSCode, CMSPageType }) {
//
//   }


export const Query = queryType({
  definition(t): void {
    t.list.field('routingConfig', {
      type: RoutingConfig,
      resolve: routingConfig,
    });
    t.field('page', {
      type: Page,
      resolve: pageHybrisRequest,
      args: {
        "id": stringArg({required: false}),
        "CMSPageType": stringArg({required: false}),
        "CMSCode": stringArg({required: false}),
      }
    })
  }
});

const RoutingConfig = objectType({
  name: 'RoutingConfig',
  definition(t) {
    t.string('pathRegex', {nullable: false});
    t.string('type', {nullable: true, deprecation: "Use layout"});
    t.string('CMSPageType', {nullable: true});
    t.string('CMSCode', {nullable: true});
    t.string('CMSPageId', {nullable: true});
    t.string('layout', {nullable: true});
  },
});

const Page = objectType({
  name: 'Page',

  definition(t) {
    t.string('page', {nullable: true});
    t.string('title', {nullable: true});
    t.string('description', {nullable: true});
    t.string('robotTag', {nullable: true});
    t.string('label', {nullable: true});
    t.string('template', {nullable: true});

    t.field('slug', {type: Slug, nullable: true});
    t.list.field('contentSlots', {type: ContentSlot, nullable: true});
  },
});

const CMSMedia = objectType({
  name: 'CMSMedia',
  definition(t) {
    t.string('code', {nullable: true});
    t.string('mime', {nullable: true});
    t.string('url', {nullable: true});
    t.string('altText', {nullable: true});
    t.string('downloadUrl', {nullable: true});
    t.field('widescreen', {type: CMSMedia, nullable: true});
    t.field('mobile', {type: CMSMedia, nullable: true});
    t.field('desktop', {type: CMSMedia, nullable: true});
    t.field('tablet', {type: CMSMedia, nullable: true});
    t.field('media', {type: CMSMedia, nullable: true});
  },
});

const CMSProduct = objectType({
  name: 'CMSProduct',
  definition(t) {
    t.string('title', {nullable: true});
    t.string('code', {nullable: true});
    t.string('url', {nullable: true});
    t.string('price', {nullable: true});
    t.field('media', {type: CMSMedia, nullable: true});
  },
});

const Component = objectType({
  name: 'Component',
  definition(t) {
    t.string('uid', {nullable: true});
    t.string('name', {nullable: true});
    t.string('container', {nullable: true});
    t.string('typeCode', {nullable: true});
    t.string('sequence', {nullable: true});
    t.string('text', {nullable: true});
    t.string('url', {nullable: true});
    t.string('banners', {nullable: true});
    t.string('content', {nullable: true});
    t.string('displayProductImages', {nullable: true});
    t.string('displayProducts', {nullable: true});
    t.string('displaySuggestions', {nullable: true});
    t.string('external', {nullable: true});
    t.string('flexType', {nullable: true});
    t.string('htmlClass', {nullable: true});
    t.string('itemsNumber', {nullable: true});
    t.string('maxProducts', {nullable: true});
    t.string('maxSuggestions', {nullable: true});
    t.string('modifiedtime', {nullable: true});
    t.string('numberOfItems', {nullable: true});
    t.string('showLanguageCurrency', {nullable: true});
    t.string('shownProductCount', {nullable: true});
    t.string('sortByField', {nullable: true});
    t.string('title', {nullable: true});
    t.string('totalDisplay', {nullable: true});
    t.string('urlLink', {nullable: true});
    t.string('uuid', {nullable: true});
    t.string('waitTimeBeforeRequest', {nullable: true});
    t.string('wrapAfter', {nullable: true});
    t.string('minCharactersBeforeRequest', {nullable: true});
    t.string('categoryCode', {nullable: true, deprecation: "don't use"});
    t.field('media', {type: CMSMedia, nullable: true});
    t.field('image', {type: CMSMedia, nullable: true});
    t.list.field('components', {type: Component, nullable: true});
    t.list.field('products', {type: CMSProduct, nullable: true});
  },
});

const ContentSlot = objectType({
  name: 'ContentSlot',
  definition(t) {
    t.string('slotId', {nullable: true});
    t.string('position', {nullable: true});
    t.string('name', {nullable: true});
    t.string('slotUuid', {nullable: true});
    t.boolean('slotShared', {nullable: true});
    t.list.field('components', {type: Component, nullable: true});
  },
});

const Slug = objectType({
  name: 'Slug',
  definition(t) {
    t.string('current', {nullable: true});
  },
});

// extend type Query {
//   page(id: String, lang: String, device: String, uid: String, CMSCode: String, CMSPageType: String): Page
//   devGenComponent(slug: String!, lang: String, device: String, uid: String): String
// }

