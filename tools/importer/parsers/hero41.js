/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image element
  const imageEl = element.querySelector('picture img');
  const imageSrc = imageEl ? imageEl.src : '';

  // Extract heading element
  const headingEl = element.querySelector('.blte-hero__text-value');
  const headingText = headingEl ? headingEl.textContent.trim() : '';

  // Create content rows
  const headerRow = ['Hero'];
  const contentRow = [
    [
      // Background image
      (() => {
        if (imageSrc) {
          const img = document.createElement('img');
          img.src = imageSrc;
          return img;
        }
        return null;
      })(),

      // Title
      (() => {
        if (headingText) {
          const heading = document.createElement('h1');
          heading.textContent = headingText;
          return heading;
        }
        return null;
      })(),
    ].filter(Boolean),
  ];

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}