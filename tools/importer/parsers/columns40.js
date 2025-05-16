/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Correct header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract the first section content
  const firstSection = element.querySelector('.blte-text');
  const firstSectionContent = [];

  if (firstSection) {
    const headingSpans = firstSection.querySelectorAll('span.blte-font--variant-h2');
    const paragraphSpans = firstSection.querySelectorAll('span.blte-font--variant-body-extra-large-500');

    headingSpans.forEach(span => {
      if (span.textContent.trim()) {
        const headingElement = document.createElement('div');
        headingElement.textContent = span.textContent.trim();
        firstSectionContent.push(headingElement);
      }
    });

    paragraphSpans.forEach(span => {
      if (span.textContent.trim()) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = span.textContent.trim();
        firstSectionContent.push(paragraphElement);
      }
    });
  }

  // Extract the image
  const imageSection = element.querySelector('.cmp-image img');
  const imageElement = [];

  if (imageSection) {
    const image = document.createElement('img');
    image.src = imageSection.getAttribute('src');
    image.alt = imageSection.getAttribute('alt') || '';
    imageElement.push(image);
  }

  // Add the first row with text and image side by side
  cells.push([firstSectionContent, imageElement]);

  // Extract the second section content
  const secondSection = element.querySelector('.blte-text__wrapper:last-child .blte-text');
  const secondSectionContent = [];

  if (secondSection) {
    secondSection.querySelectorAll('p').forEach((p) => {
      if (p.textContent.trim()) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = p.textContent.trim();
        secondSectionContent.push(paragraphElement);
      }
    });
  }

  // Add second row with extracted content
  cells.push([secondSectionContent]);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structure
  element.replaceWith(table);
}