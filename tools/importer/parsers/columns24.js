/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Collecting items for the second row, extracting title, description, image, and link dynamically
  const items = Array.from(element.querySelectorAll('li')).map((item) => {
    const title = item.querySelector('h4 span')?.textContent.trim() || '';
    const description = item.querySelector('.blte-teaser-v2__description .blte-text div')?.textContent.trim() || '';
    
    const image = item.querySelector('picture img');
    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.getAttribute('data-src');
      imageElement.alt = image.getAttribute('alt');
    }

    const link = item.querySelector('a');
    const linkElement = document.createElement('a');
    if (link) {
      linkElement.href = link.getAttribute('href');
      linkElement.textContent = link.textContent.trim();
    }

    // Combining content into a single cell dynamically
    const combinedContent = document.createElement('div');
    combinedContent.append(
      document.createTextNode(title),
      document.createElement('br'),
      document.createTextNode(description),
      document.createElement('br'),
      imageElement,
      document.createElement('br'),
      linkElement
    );

    return [combinedContent];
  });

  const tableData = [
    headerRow,
    ...items, // Spread items to match the table structure
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured block
  element.replaceWith(blockTable);
}