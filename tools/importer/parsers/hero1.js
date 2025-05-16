/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row is exactly as specified
  const headerRow = ['Hero'];

  // Dynamically extract image source and alt text
  const imageElement = element.querySelector('.blte-hero__image img');
  const imageSrc = imageElement ? imageElement.src : null;
  const imageAlt = imageElement ? imageElement.alt : null;

  // Dynamically extract heading text
  const headingElement = element.querySelector('.blte-hero__text-value');
  const headingText = headingElement ? headingElement.textContent.trim() : null;

  // Create cells for the Hero block
  const heroCells = [
    headerRow,
    [
      (() => {
        if (imageSrc) {
          const img = document.createElement('img');
          img.src = imageSrc;
          img.alt = imageAlt || '';
          return img;
        }
        return '';
      })(),
      (() => {
        if (headingText) {
          const h1 = document.createElement('h1');
          h1.textContent = headingText;
          return h1;
        }
        return '';
      })()
    ]
  ];

  const heroTable = WebImporter.DOMUtils.createTable(heroCells, document);

  // Replace element with structured table
  element.replaceWith(heroTable);
}