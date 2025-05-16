/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the items from the element
  const items = Array.from(element.querySelectorAll('.blte-feature-item'));

  // Create the header row for the table
  const headerRow = ['Columns'];

  // Create rows for each feature item
  const rows = items.map((item) => {
    // Extract the title
    const title = item.querySelector('.blte-title span').textContent.trim();

    // Extract the link
    const link = item.querySelector('.blte-btn');
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();

    // Combine title and link into a single cell
    const cellContent = [title, linkElement];

    return [cellContent];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}