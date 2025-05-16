/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const blockName = 'Columns';

  const columns = [];

  // Process each teaser wrapper found within the element
  const teaserWrappers = element.querySelectorAll('.blte-teaser__wrapper');

  teaserWrappers.forEach((teaserWrapper) => {
    const teaser = teaserWrapper.querySelector('.blte-teaser');

    if (!teaser) {
      return;
    }

    const image = teaser.querySelector('picture img');
    const title = teaser.querySelector('.blte-teaser__title h4');
    const teaserContent = [];

    // Check for image and title and push them to teaserContent
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';
      teaserContent.push(imgElement);
    }

    if (title) {
      const titleElement = document.createElement('p');
      titleElement.textContent = title.textContent.trim();
      teaserContent.push(titleElement);
    }

    columns.push(teaserContent);
  });

  // Create the block table with dynamic content using WebImporter.DOMUtils.createTable
  const headerRow = [blockName];
  const cells = [headerRow, ...columns.map((column) => [column])];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}