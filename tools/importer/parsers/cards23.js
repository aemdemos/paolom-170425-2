/* global WebImporter */
export default function parse(element, { document }) {
  // Extract cards from the element
  const cards = Array.from(element.querySelectorAll('li.blte-teaser-v2')).map((card) => {
    const imageElement = card.querySelector('.blte-teaser-v2__image img');
    const image = document.createElement('img');
    image.src = imageElement?.src || '';
    image.alt = imageElement?.alt || '';

    const titleElement = card.querySelector('.blte-title a');
    const title = document.createElement('h4');
    const link = document.createElement('a');
    link.href = titleElement?.href || '#';
    link.textContent = titleElement?.textContent || '';
    title.appendChild(link);

    const descriptionElement = card.querySelector('.blte-teaser-v2__description .blte-text a');
    const description = document.createElement('p');
    const cta = document.createElement('a');
    cta.href = descriptionElement?.href || '#';
    cta.textContent = descriptionElement?.textContent || '';
    description.appendChild(cta);

    return [image, [title, description]];
  });

  // Create table structure
  const tableData = [
    ['Cards'],
    ...cards
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with the block table
  element.replaceWith(blockTable);
}