/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  rows.push(['Accordion']);

  // Extract accordion items
  const accordionItems = element.querySelectorAll('.blte-accordion-item');
  accordionItems.forEach((item) => {
    const titleElement = item.querySelector('.blte-title');
    const contentElement = item.querySelector('.blte-accordion-item__content');

    // Title cell
    const titleCell = titleElement ? titleElement.textContent.trim() : 'No title available';

    // Content cell
    const contentCell = [];
    if (contentElement) {
      contentElement.querySelectorAll(':scope > div, :scope > span, :scope > a').forEach((child) => {
        if (child.tagName === 'A') {
          const link = document.createElement('a');
          link.href = child.href;
          link.textContent = child.textContent;
          contentCell.push(link);
        } else {
          contentCell.push(child.textContent.trim());
        }
      });
    }

    // Consolidate content into a single simplified structure
    const consolidatedContent = document.createElement('div');
    contentCell.forEach((child) => {
      if (typeof child === 'string') {
        const paragraph = document.createElement('p');
        paragraph.textContent = child;
        consolidatedContent.appendChild(paragraph);
      } else {
        consolidatedContent.appendChild(child);
      }
    });

    rows.push([titleCell, consolidatedContent]);
  });

  // Create Table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}