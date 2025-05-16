/* global WebImporter */
export default function parse(element, { document }) {
  // Create header for the table
  const headerRow = ['Cards'];

  // Extract items from the list and create rows
  const items = [...element.querySelectorAll('li')];
  const rows = items.map(item => {
    // Extract image
    const image = item.querySelector('img');
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    // Extract title and description
    const titleElement = item.querySelector('.blte-title a');
    const title = titleElement ? titleElement.textContent : '';

    const descriptionElement = item.querySelector('.blte-text');
    const description = descriptionElement ? descriptionElement.textContent : '';

    const textContent = [];

    if (title) {
      const titleHeading = document.createElement('h4');
      titleHeading.textContent = title;
      textContent.push(titleHeading);
    }

    if (description) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = description;
      textContent.push(descriptionParagraph);
    }

    return [imageElement, textContent];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with the table
  element.replaceWith(blockTable);
}