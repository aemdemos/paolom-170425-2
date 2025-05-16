/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row that matches the example
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extract Image
  const imageElement = element.querySelector('img');
  let image = '';
  if (imageElement) {
    const imageSrc = imageElement.getAttribute('src');
    image = document.createElement('img');
    image.src = imageSrc;
  }

  // Extract Heading
  const headingElement = element.querySelector('h1');
  const headingText = headingElement ? headingElement.textContent.trim() : '';
  const heading = document.createElement('h1');
  heading.textContent = headingText;

  // Extract Call-to-Action (CTA) if present
  const ctaElement = element.querySelector('a');
  let cta = '';
  if (ctaElement) {
    const ctaText = ctaElement.textContent.trim();
    const ctaLink = ctaElement.getAttribute('href');
    cta = document.createElement('a');
    cta.href = ctaLink;
    cta.textContent = ctaText;
  }

  // Combine extracted content into a single content row
  const contentRow = [[image, heading, cta].filter(Boolean)]; // Remove empty elements and combine into a single cell
  cells.push(contentRow);

  // Check for Section Metadata and create it if required
  const metadataElement = element.querySelector('[data-section-metadata]');
  if (metadataElement) {
    const hr = document.createElement('hr');
    const metadataHeaderRow = ['Section Metadata'];
    const metadataContentRow = [metadataElement.textContent.trim()];
    const metadataTable = WebImporter.DOMUtils.createTable([metadataHeaderRow, metadataContentRow], document);

    // Replace element with section metadata and block table
    element.replaceWith(hr, metadataTable);
  } else {
    // Create table and replace original element
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}