/* global WebImporter */

export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extracting the content inside the list items dynamically
  const listItems = element.querySelectorAll('li.blte-feature-item');

  const cells = [
    ['Columns'], // Header row matching the example exactly
    [
      ...Array.from(listItems).map((item) => {
        const titleElement = item.querySelector('.blte-title span');
        const descriptionElement = item.querySelector('.blte-text');

        const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
        const description = descriptionElement ? descriptionElement.textContent.trim() : 'No description available';

        const content = document.createElement('div');

        const titleNode = document.createElement('strong');
        titleNode.textContent = title;
        content.appendChild(titleNode);

        const descriptionNode = document.createElement('p');
        descriptionNode.textContent = description;
        content.appendChild(descriptionNode);

        return content;
      })
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(hr, block);
}