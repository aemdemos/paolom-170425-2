/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Accordion']);

  // Extract accordion items
  const items = element.querySelectorAll('.blte-accordion-item');
  items.forEach((item) => {
    const titleElement = item.querySelector('.blte-title');
    const contentElement = item.querySelector('[role="region"]');

    if (titleElement && contentElement) {
      const title = titleElement.textContent.trim();

      // Extract content
      const content = document.createElement('div');
      content.innerHTML = contentElement.innerHTML;

      rows.push([title, content]);
    }
  });

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(tableBlock);
}