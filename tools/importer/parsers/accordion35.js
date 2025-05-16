/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content from accordion items
  const extractAccordionData = (accordionItem) => {
    const titleButton = accordionItem.querySelector('.blte-accordion-item__title');
    const titleText = titleButton?.textContent?.trim() || '';

    const contentContainer = accordionItem.querySelector('.blte-accordion-item__content');
    const contentElements = Array.from(contentContainer?.children || []);

    return [titleText, contentElements];
  };

  // Fetch accordion items
  const accordionItems = Array.from(element.querySelectorAll('.blte-accordion-item'));

  // Construct table data for the accordion block
  const tableData = [
    ['Accordion'],
    ...accordionItems.map(extractAccordionData),
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}