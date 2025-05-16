/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['<strong>Cards</strong>'];
  const rows = [];

  // Process the cards
  const cards = element.querySelectorAll('.blte-feature-item');
  cards.forEach((card) => {
    const imageSrc = card.querySelector('img')?.src;
    const imageAlt = card.querySelector('img')?.alt || '';
    const title = card.querySelector('.blte-feature-item__title h4')?.textContent || '';
    const description = card.querySelector('.blte-feature-item__content > p')?.textContent || '';
    const ctaLink = card.querySelector('a')?.href;
    const ctaText = card.querySelector('a span.blte-link-button__label')?.textContent || '';

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    imageElement.alt = imageAlt;

    const contentElement = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('h4');
      titleElement.textContent = title;
      contentElement.appendChild(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      contentElement.appendChild(descriptionElement);
    }
    if (ctaLink) {
      const linkElement = document.createElement('a');
      linkElement.href = ctaLink;
      linkElement.textContent = ctaText;
      contentElement.appendChild(linkElement);
    }

    rows.push([imageElement, contentElement]);
  });

  const tableStructure = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);
  element.replaceWith(blockTable);
}