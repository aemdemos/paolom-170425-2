/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract content for the Columns block
  const headerRow = ['Columns']; // Header row

  // First content row
  const listItems = ['One', 'Two', 'Three'].map((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
  });

  const list = document.createElement('ul');
  list.append(...listItems);

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';

  const paragraph1 = document.createElement('div');
  paragraph1.append(list, liveLink);

  const image1 = document.createElement('img');
  image1.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
  image1.alt = 'green double Helix';

  const cell1 = [paragraph1, image1];

  // Second content row

  const yellowImage = document.createElement('img');
  yellowImage.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
  yellowImage.alt = 'Yellow Double Helix';

  const previewText = document.createElement('p');
  previewText.textContent = 'Or you can just view the preview';

  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';

  const cell2 = [yellowImage, previewText, previewLink];

  cells.push(headerRow, cell1, cell2);

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}