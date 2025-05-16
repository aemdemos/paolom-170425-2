/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extract content from the text side
  const eyebrow = element.querySelector('.blte-text-and-media__content__eyebrow h6')?.textContent.trim();
  const title = element.querySelector('.blte-font h2')?.textContent.trim();
  const description = element.querySelector('.blte-text-and-media__content__description .blte-text')?.textContent.trim();
  const button = element.querySelector('.blte-text-and-media__content__buttons a');
  const buttonText = button?.textContent.trim();
  const buttonLink = button?.getAttribute('href');

  // Create the text content cell
  const textContent = document.createElement('div');
  textContent.append(
    eyebrow ? document.createTextNode(`${eyebrow}\n`) : '',
    title ? document.createTextNode(`${title}\n`) : '',
    description ? document.createTextNode(`${description}\n`) : ''
  );
  if (buttonText && buttonLink) {
    const anchor = document.createElement('a');
    anchor.href = buttonLink;
    anchor.textContent = buttonText;
    textContent.append(anchor);
  }

  // Extract content from the media side
  const picture = element.querySelector('.blte-text-and-media__media__attachment picture');

  // Create table structure
  const cells = [
    ['Columns'], // Header row
    [textContent, picture], // Content row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(hr, table);
}