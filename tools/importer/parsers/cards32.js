/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content
  const cards = [];

  // Find all card items within the element
  const cardItems = element.querySelectorAll('li[class*="teaser-v2"]');

  // Iterate over each card item and extract its content
  cardItems.forEach(card => {
    const imageElement = card.querySelector('picture img');
    const image = imageElement ? document.createElement('img') : null;
    if (image) {
      image.setAttribute('src', imageElement.getAttribute('src'));
      image.setAttribute('alt', imageElement.getAttribute('alt'));
    }

    const titleElement = card.querySelector('.blte-title a');
    const title = titleElement ? document.createElement('h4') : null;
    if (titleElement) {
      title.textContent = titleElement.textContent;
    }

    const descriptionElement = card.querySelector('.blte-description p');
    const description = descriptionElement ? document.createElement('p') : null;
    if (descriptionElement) {
      description.textContent = descriptionElement.textContent;
    }

    const linkElement = card.querySelector('.blte-title a');
    const link = linkElement ? document.createElement('a') : null;
    if (linkElement) {
      link.setAttribute('href', linkElement.getAttribute('href'));
      link.textContent = linkElement.textContent;
    }

    const textContent = [title, description, link].filter(e => e);

    // Construct the row with image and text content
    cards.push([image, textContent]);
  });

  // Create the header row
  const headerRow = ['Cards'];

  // Combine header row and card rows
  const cells = [headerRow, ...cards];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}