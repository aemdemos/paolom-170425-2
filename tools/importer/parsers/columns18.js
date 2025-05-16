/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Header row for the block, exact match based on example
  const headerRow = ['Columns'];

  // Extracting column content dynamically without duplicates
  const columnsContent = [];
  const processedTitles = new Set();

  element.querySelectorAll('.blte-link-button-list').forEach((list) => {
    const columnData = [];
    const title = list.querySelector('h3');
    if (title && !processedTitles.has(title.textContent.trim())) {
      processedTitles.add(title.textContent.trim());
      columnData.push(title.textContent.trim()); // Dynamic extraction of title
      list.querySelectorAll('a').forEach((link) => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        columnData.push(anchor); // Dynamic extraction of links
      });
      columnsContent.push(columnData);
    }
  });

  // Extract footer copyright text dynamically
  const footerContent = document.createElement('span');
  const footerCopyright = element.querySelector('.blte-footer__copyright');
  if (footerCopyright) {
    footerContent.textContent = footerCopyright.textContent.trim();
  }

  // Constructing table content
  const blockTableContent = [
    headerRow,
    ...columnsContent,
    [footerContent]
  ];

  // Creating the table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(blockTableContent, document);

  // Replacing original element
  element.replaceWith(hr, blockTable);
}