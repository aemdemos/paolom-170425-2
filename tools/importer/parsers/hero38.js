/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the hero image
  const heroImage = element.querySelector('.blte-hero__image img');
  const heroTitle = element.querySelector('h1.blte-title');

  // Get the hero image source dynamically
  const heroImageSrc = heroImage ? heroImage.src : '';

  // Extract the hero heading dynamically
  const heroHeading = heroTitle ? heroTitle.textContent.trim() : '';

  // Define cells for the table with dynamic content
  const cells = [
    ['Hero'],
    [
      heroImageSrc ? (() => { 
        const img = document.createElement('img'); 
        img.src = heroImageSrc; 
        return img; 
      })() : '',
      heroHeading ? (() => {
        const heading = document.createElement('h1');
        heading.textContent = heroHeading; 
        return heading; 
      })() : ''
    ]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}