/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';

    // Extract image
    const imageElement = element.querySelector('.blte-hero__image img');
    const imageSrc = imageElement ? imageElement.src : '';
    const img = document.createElement('img');
    img.src = imageSrc;

    // Extract heading
    const headingElement = element.querySelector('.blte-hero__text-value-span');
    const headingText = headingElement ? headingElement.textContent.trim() : '';
    const heading = document.createElement('h1');
    heading.textContent = headingText;

    // Extract title
    const titleElement = element.querySelector('.blte-title');
    const titleText = titleElement ? titleElement.textContent.trim() : '';
    const title = document.createElement('h1');
    title.textContent = titleText;

    // Combine content into a single cell
    const contentCell = [img, heading, title];

    // Create table cells
    const cells = [
        headerRow,
        [contentCell],
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the element with the new block table
    element.replaceWith(block);
}