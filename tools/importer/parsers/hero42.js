/* global WebImporter */
export default function parse(element, { document }) {
  // Create <hr> for section break
  const hr = document.createElement('hr');

  // Extract background image
  const img = element.querySelector('.blte-hero__image img');
  const backgroundImage = img ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = img.src;
    backgroundImage.alt = img.alt || '';
  }

  // Extract heading text
  const heading = element.querySelector('.blte-hero__text-value-span');
  const headingText = heading ? document.createElement('p') : null;
  if (headingText) {
    headingText.textContent = heading.textContent;
  }

  // Extract call-to-action link
  const link = element.querySelector('.blte-text a');
  const ctaElement = link ? document.createElement('a') : null;
  if (ctaElement) {
    ctaElement.href = link.href;
    ctaElement.textContent = link.textContent;
  }

  // Create block table
  const cells = [
    ['Hero'], // Header row
    [
      [headingText, backgroundImage, ctaElement].filter(Boolean),
    ],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(hr, blockTable);
}