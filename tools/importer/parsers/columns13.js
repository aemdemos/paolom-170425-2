/* global WebImporter */
export default function parse(element, { document }) {
  // Check for section metadata block; the example markdown structure does not define one.
  const hr = document.createElement('hr');

  // Extract all teasers from the given HTML structure dynamically
  const teasers = Array.from(element.querySelectorAll('.blte-teaser__wrapper')).map((wrapper) => {
    const imageElement = wrapper.querySelector('img');
    const titleElement = wrapper.querySelector('.blte-title');

    // Extract image dynamically, handling edge cases
    const image = imageElement ? document.createElement('img') : null;
    if (image) {
      image.src = imageElement.src;
      image.alt = imageElement.alt || '';
    }

    // Extract title dynamically, handling potential missing data
    const title = titleElement ? titleElement.textContent.trim() : '';

    return [title, image];
  });

  // Ensure the table header matches the example structure exactly
  const tableData = [
    ['Columns'], // Header row matches example exactly
    ...teasers,  // Content rows dynamically extracted
  ];

  // Create the table block using the helper function
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the <hr> for the section break and the newly created block
  element.replaceWith(hr, block);
}