/* global WebImporter */
export default function parse(element, { document }) {
  // Create the section break (hr)
  const hr = document.createElement('hr');

  // Header row for the table
  const headerRow = ['Columns'];

  // Extracting content rows dynamically based on provided HTML
  const contentRows = [];

  element.querySelectorAll('li').forEach((item) => {
    const image = item.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const link = item.querySelector('a');
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent;

    contentRows.push([imageElement, linkElement]);
  });

  // Combine header row and extracted rows into the table data
  const tableData = [headerRow, ...contentRows];

  // Create the block table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table preceded by the hr
  element.replaceWith(hr, blockTable);
}