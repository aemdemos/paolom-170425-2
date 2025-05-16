/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  cells.push(['Cards (no images)']);

  // Extract content from the input element
  const textWrappers = element.querySelectorAll('.blte-text__wrapper');
  textWrappers.forEach(wrapper => {
    const content = [];

    const heading = wrapper.querySelector('span.blte-font--variant-h2');
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      content.push(headingElement);
      content.push(document.createElement('br'));
    }

    const description = wrapper.querySelector('span.blte-font--variant-body-extra-large-400');
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent.trim();
      content.push(descriptionElement);
    }

    cells.push([content]);
  });

  const buttonWrapper = element.querySelector('.blte-btn__wrapper');
  if (buttonWrapper) {
    const button = buttonWrapper.querySelector('a.blte-btn');
    if (button) {
      const linkElement = document.createElement('a');
      linkElement.href = button.href;
      linkElement.textContent = button.textContent.trim();
      cells[cells.length - 1][0].push(document.createElement('br'));
      cells[cells.length - 1][0].push(linkElement);
    }
  }

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}