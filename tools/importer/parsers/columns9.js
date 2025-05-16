/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Correctly define the header row as per the example
  const cells = [headerRow];

  // Extract list items dynamically
  const listItems = Array.from(element.querySelectorAll('li'));

  listItems.forEach((li) => {
    const img = li.querySelector('img');
    const link = li.querySelector('a');

    const cellContent = [];

    // Safely create and add image element if present
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      cellContent.push(imageElement);
    }

    // Safely create and add link element if present
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      cellContent.push(linkElement);
    }

    // Add content to table row only if non-empty
    if (cellContent.length > 0) {
      cells.push([cellContent]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block; no 'hr' element added since not required
  element.replaceWith(block);
}