/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Create the hr element for the section break
  const hr = document.createElement('hr');

  // Extract content dynamically from the input element
  const titleElement = element.querySelector('i > span');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const firstParagraphElement = element.querySelector('.blte-font--variant-body-extra-large-400');
  const firstParagraph = firstParagraphElement ? firstParagraphElement.textContent.trim() : '';

  const imageElement = element.querySelector('img');
  const image = imageElement ? (() => {
    const img = document.createElement('img');
    img.src = imageElement.src;
    img.alt = imageElement.alt;
    return img;
  })() : null;

  const secondParagraphElement = element.querySelectorAll('.blte-font--variant-body-extra-large-400')[1];
  const secondParagraph = secondParagraphElement ? secondParagraphElement.textContent.trim() : '';

  // Create the columns block
  const columnsHeader = ['Columns'];
  
  const blockData = [
    columnsHeader,
    [title, firstParagraph],
    [image, secondParagraph],
  ];

  const block = createTable(blockData, document);

  // Replace the original element with the final block
  element.replaceWith(hr, block);
}