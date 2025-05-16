/* global WebImporter */
export default function parse(element, { document }) {
  const blockName = 'Hero';

  // Extract background image
  const pictureElement = element.querySelector('picture');
  const imgElement = pictureElement ? pictureElement.querySelector('img') : null;
  const imageSrc = imgElement ? imgElement.getAttribute('src') : '';

  const image = document.createElement('img');
  if (imageSrc) {
    image.setAttribute('src', imageSrc);
  }

  // Extract title
  const titleElement = element.querySelector('.blte-hero__text-value');
  const title = titleElement ? titleElement.textContent.trim() : '';
  const heading = document.createElement('h1');
  heading.textContent = title;

  // Combine image and heading into one cell
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);
  contentCell.appendChild(heading);

  // Create table structure
  const cells = [
    [blockName],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the block
  element.replaceWith(table);
}