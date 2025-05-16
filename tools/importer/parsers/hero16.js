/* global WebImporter */
export default function parse(element, { document }) {
  const tableHeader = ['Hero'];

  // Extract image
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.src : null;
  const imgTag = image ? document.createElement('img') : null;
  if (imgTag) {
    imgTag.src = image;
  }

  // Extract title
  const titleElement = element.querySelector('.blte-title');
  const title = titleElement ? titleElement.textContent.trim() : '';
  const titleTag = document.createElement('h1');
  titleTag.textContent = title;

  // Extract optional subheading
  const subheadingElement = element.querySelector('.blte-text-and-media__content__eyebrow');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';
  const subheadingTag = document.createElement('p');
  subheadingTag.textContent = subheading;

  // Extract Call-to-Action button
  const buttonElement = element.querySelector('.blte-btn');
  let buttonTag;
  if (buttonElement) {
    buttonTag = document.createElement('a');
    buttonTag.href = buttonElement.href;
    buttonTag.textContent = buttonElement.textContent.trim();
  }

  // Combine all content into a single cell
  const combinedContent = document.createElement('div');
  if (imgTag) combinedContent.appendChild(imgTag);
  combinedContent.appendChild(titleTag);
  if (subheadingTag) combinedContent.appendChild(subheadingTag);
  if (buttonTag) combinedContent.appendChild(buttonTag);

  // Create table rows
  const tableContent = [
    [combinedContent],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable([tableHeader, ...tableContent], document);

  // Replace element with block
  element.replaceWith(block);
}