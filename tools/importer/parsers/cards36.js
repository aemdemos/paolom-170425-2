/* global WebImporter */

export default function parse(element, { document }) {
  const rows = [];

  // Add header row for block name
  const headerRow = ['Cards'];
  rows.push(headerRow);

  // Extract card information from the list items
  const items = element.querySelectorAll('li');

  items.forEach((item) => {
    // Extract image
    const imageElement = item.querySelector('picture img');
    const image = imageElement ? document.createElement('img') : null;
    if (image) {
      image.src = imageElement.src;
      image.alt = imageElement.alt;
    }

    // Extract title
    const titleElement = item.querySelector('h4 a');
    const title = titleElement ? document.createElement('strong') : null;
    if (title) {
      title.textContent = titleElement.textContent;
    }

    // Extract description and link
    const descriptionElement = item.querySelector('.blte-teaser-v2__description a');
    const description = descriptionElement ? document.createElement('p') : null;
    const link = descriptionElement ? document.createElement('a') : null;
    if (description) {
      description.textContent = descriptionElement.textContent;
    }
    if (link) {
      link.href = descriptionElement.href;
      link.textContent = descriptionElement.textContent;
    }

    // Combine extracted content into cells
    const cardContent = [title, description, link].filter((content) => content);

    rows.push([image, cardContent]);
  });

  // Create table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new table
  element.replaceWith(blockTable);
}