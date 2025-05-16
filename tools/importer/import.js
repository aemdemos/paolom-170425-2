/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import hero8Parser from './parsers/hero8.js';
import hero7Parser from './parsers/hero7.js';
import hero2Parser from './parsers/hero2.js';
import hero11Parser from './parsers/hero11.js';
import hero5Parser from './parsers/hero5.js';
import columns13Parser from './parsers/columns13.js';
import columns10Parser from './parsers/columns10.js';
import hero1Parser from './parsers/hero1.js';
import hero16Parser from './parsers/hero16.js';
import accordion6Parser from './parsers/accordion6.js';
import tableBordered14Parser from './parsers/tableBordered14.js';
import columns18Parser from './parsers/columns18.js';
import columns22Parser from './parsers/columns22.js';
import columns21Parser from './parsers/columns21.js';
import hero12Parser from './parsers/hero12.js';
import accordion26Parser from './parsers/accordion26.js';
import cards23Parser from './parsers/cards23.js';
import columns25Parser from './parsers/columns25.js';
import hero30Parser from './parsers/hero30.js';
import cardsNoImages31Parser from './parsers/cardsNoImages31.js';
import columns24Parser from './parsers/columns24.js';
import cards32Parser from './parsers/cards32.js';
import hero27Parser from './parsers/hero27.js';
import cards34Parser from './parsers/cards34.js';
import columns20Parser from './parsers/columns20.js';
import accordion35Parser from './parsers/accordion35.js';
import columns33Parser from './parsers/columns33.js';
import cards36Parser from './parsers/cards36.js';
import hero38Parser from './parsers/hero38.js';
import hero41Parser from './parsers/hero41.js';
import accordion39Parser from './parsers/accordion39.js';
import columns37Parser from './parsers/columns37.js';
import columns9Parser from './parsers/columns9.js';
import hero43Parser from './parsers/hero43.js';
import cards15Parser from './parsers/cards15.js';
import columns40Parser from './parsers/columns40.js';
import columns3Parser from './parsers/columns3.js';
import columns29Parser from './parsers/columns29.js';
import hero42Parser from './parsers/hero42.js';
import cards44Parser from './parsers/cards44.js';
import columns28Parser from './parsers/columns28.js';
import columns17Parser from './parsers/columns17.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero8: hero8Parser,
  hero7: hero7Parser,
  hero2: hero2Parser,
  hero11: hero11Parser,
  hero5: hero5Parser,
  columns13: columns13Parser,
  columns10: columns10Parser,
  hero1: hero1Parser,
  hero16: hero16Parser,
  accordion6: accordion6Parser,
  tableBordered14: tableBordered14Parser,
  columns18: columns18Parser,
  columns22: columns22Parser,
  columns21: columns21Parser,
  hero12: hero12Parser,
  accordion26: accordion26Parser,
  cards23: cards23Parser,
  columns25: columns25Parser,
  hero30: hero30Parser,
  cardsNoImages31: cardsNoImages31Parser,
  columns24: columns24Parser,
  cards32: cards32Parser,
  hero27: hero27Parser,
  cards34: cards34Parser,
  columns20: columns20Parser,
  accordion35: accordion35Parser,
  columns33: columns33Parser,
  cards36: cards36Parser,
  hero38: hero38Parser,
  hero41: hero41Parser,
  accordion39: accordion39Parser,
  columns37: columns37Parser,
  columns9: columns9Parser,
  hero43: hero43Parser,
  cards15: cards15Parser,
  columns40: columns40Parser,
  columns3: columns3Parser,
  columns29: columns29Parser,
  hero42: hero42Parser,
  cards44: cards44Parser,
  columns28: columns28Parser,
  columns17: columns17Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => instance.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      // parse the element
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, publishUrl });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, publishUrl });

    return [{
      element: main,
      path,
    }];
  },
};
