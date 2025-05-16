/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Header row exactly matching the example

  // Extract content dynamically from the element
  const ul = element.querySelector('.blte-teasers-list__items');
  if (!ul) {
    console.warn('No list found in the element.');
    return;
  }

  const items = ul.querySelectorAll('li');

  const columns = Array.from(items).map((item) => {
    const image = item.querySelector('img');
    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
      imageElement.width = image.width;
      imageElement.height = image.height;
    }

    const link = item.querySelector('a');
    const linkElement = link ? document.createElement('a') : null;
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.innerHTML = link.innerHTML;
    }

    // Combine extracted elements into a single cell for the column
    const cellContent = [];
    if (imageElement) cellContent.push(imageElement);
    if (linkElement) cellContent.push(linkElement);

    return cellContent;
  });

  const block = WebImporter.DOMUtils.createTable([
    headerRow, // Header row exactly matching the example
    ...columns,
  ], document);

  // Replace the original element with the new structure
  element.replaceWith(block);
}