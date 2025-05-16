/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content for the header row
  const headerRow = ['Columns'];

  // Extract content for the first column
  const listItems = [];
  const ulElement = element.querySelector('ul');
  if (ulElement) {
    ulElement.querySelectorAll('li').forEach((li) => {
      listItems.push(li.textContent.trim());
    });
  }

  const liveLink = element.querySelector('a[href*="word-edit.officeapps.live.com"]');
  const firstColumnContent = [];

  // Add block description
  const descriptionPara = document.createElement('p');
  descriptionPara.textContent = 'Columns block';
  firstColumnContent.push(descriptionPara);

  // Add list of items if available
  if (listItems.length > 0) {
    const ul = document.createElement('ul');
    listItems.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    firstColumnContent.push(ul);
  }

  // Add live link if available
  if (liveLink) {
    firstColumnContent.push(liveLink.cloneNode(true));
  }

  const firstImage = element.querySelector('img[src*="media_193050d52a802830d970fde49644ae9a504a61b7f.png"]');
  const previewContent = [];

  // Add image if available
  if (firstImage) {
    previewContent.push(firstImage.cloneNode(true));
  }

  // Add preview text
  const previewText = document.createElement('p');
  previewText.textContent = 'Or you can just view the preview';
  previewContent.push(previewText);

  const previewLink = element.querySelector('a[href*="word-edit.officeapps.live.com"]');

  // Add preview link if available
  if (previewLink) {
    previewContent.push(previewLink.cloneNode(true));
  }

  // Create table structure
  const cells = [
    headerRow,
    [firstColumnContent, previewContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}