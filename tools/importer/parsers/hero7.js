/* global WebImporter */

export default function parse(element, { document }) {
  // Extract background image
  const pictureElement = element.querySelector('.blte-hero__image picture');
  const imgElement = pictureElement.querySelector('img');
  const imageSrc = imgElement?.getAttribute('src') || '';

  // Extract title
  const titleElement = element.querySelector('.blte-hero__text-value');
  const titleText = titleElement?.textContent.trim() || '';

  // Create the table data
  const tableData = [
    ['Hero'],
    [
      (() => {
        const content = [];
        if (imageSrc) {
          const img = document.createElement('img');
          img.setAttribute('src', imageSrc);
          img.setAttribute('alt', imgElement?.getAttribute('alt') || '');
          content.push(img);
        }
        if (titleText) {
          const heading = document.createElement('h1');
          heading.textContent = titleText;
          content.push(heading);
        }
        return content;
      })(),
    ],
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}