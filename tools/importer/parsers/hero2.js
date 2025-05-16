/* global WebImporter */
export default function parse(element, { document }) {
  const createHeroBlock = (imageSrc, titleText) => {
    const headerRow = ['Hero'];

    const image = document.createElement('img');
    image.src = imageSrc;

    const title = document.createElement('h1');
    title.textContent = titleText;

    return WebImporter.DOMUtils.createTable([
      headerRow,
      [image, title],
    ], document);
  };

  const hr = document.createElement('hr');

  const heroBlocks = [];

  const sections = element.querySelectorAll('.blte-carousel__slide');

  sections.forEach((section) => {
    const imageElement = section.querySelector('picture img');
    const titleElement = section.querySelector('.blte-hero__text-value-span');

    if (imageElement && titleElement) {
      const heroBlock = createHeroBlock(imageElement.src, titleElement.textContent);
      heroBlocks.push(heroBlock);
    }
  });

  element.replaceWith(hr, ...heroBlocks);
}