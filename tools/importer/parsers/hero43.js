/* global WebImporter */
export default function parse(element, { document }) {
  // Create a section break
  const hr = document.createElement('hr');

  // Extract the image source and create an image element
  const imageContainer = element.querySelector('.blte-hero__image img');
  const imageSrc = imageContainer ? imageContainer.src : null; // Ensure null if missing
  const imageElement = imageSrc ? document.createElement('img') : document.createElement('span');
  if (imageSrc) {
    imageElement.src = imageSrc;
  } else {
    imageElement.textContent = 'No Image Available';
  }

  // Extract the heading text and create a heading element
  const titleContainer = element.querySelector('.blte-hero__text-value-span');
  const titleText = titleContainer ? titleContainer.textContent.trim() : null; // Ensure null if missing
  const headingElement = titleText ? document.createElement('h1') : document.createElement('span');
  if (titleText) {
    headingElement.textContent = titleText;
  } else {
    headingElement.textContent = 'No Heading Available';
  }

  // Create the block table for the Hero component
  const tableData = [
    ['Hero'], // Header row matching the example
    [imageElement, headingElement], // Content row with image and heading
  ];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured content
  element.replaceWith(hr, table);
}