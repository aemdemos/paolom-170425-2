/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image dynamically
  const imageElement = element.querySelector('.blte-hero__image img');
  const image = imageElement ? document.createElement('img') : null;
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
  }

  // Extract title dynamically
  const titleElement = element.querySelector('.blte-hero__text-value');
  const title = titleElement ? document.createElement('h1') : null;
  if (titleElement) {
    title.textContent = titleElement.textContent.trim();
  }

  // Prepare table cells
  const cells = [
    ['Hero'],
    [image, title]
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}