/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image dynamically
  const picture = element.querySelector('picture');

  // Dynamically extract the heading (ensure content is properly extracted)
  const headingElement = element.querySelector('.blte-teaser-v2__text-wrapper h1, h2, h3');
  const heading = document.createElement('h1');
  heading.textContent = headingElement && headingElement.textContent.trim() ? headingElement.textContent.trim() : 'Hero Heading';

  // Dynamically extract the button (ensure proper attributes)
  const buttonElement = element.querySelector('a');
  const button = document.createElement('a');
  button.href = buttonElement && buttonElement.href ? buttonElement.href : '#';
  button.textContent = buttonElement ? buttonElement.textContent.trim() : 'Action Button';

  // Ensure correct table structure aligns EXACTLY with example
  const headerRow = ['Hero'];
  const cells = [
    headerRow,
    [picture, heading, button],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}