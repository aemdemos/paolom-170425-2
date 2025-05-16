/* global WebImporter */
 export default function parse(element, { document }) {
  // Initialize rows array
  const rows = [];

  // Add header row dynamically, matching example structure exactly
  rows.push(['Cards']);

  // Extract image and text content dynamically from the element
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  image.src = imageElement.src;
  image.alt = imageElement.alt;

  const textContent = document.createElement('div');
  textContent.textContent = imageElement.alt; // Dynamically extracted alt text for descriptive content

  // Push dynamic content to rows
  rows.push([image, textContent]);

  // Create table using WebImporter.DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}