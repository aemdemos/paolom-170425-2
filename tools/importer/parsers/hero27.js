/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row as specified in the example
  const headerRow = ['Hero'];

  // Extract the image
  const img = element.querySelector(".blte-text-and-media__media__attachment img");
  const image = img ? document.createElement("img") : null;
  if (img && image) {
    image.src = img.src;
    image.alt = img.alt;
  }

  // Extract the title
  const titleElement = element.querySelector(".blte-title");
  const title = titleElement ? document.createElement("h1") : null;
  if (titleElement && title) {
    title.textContent = titleElement.textContent.trim();
  }

  // Extract the subheading
  const subheadingElement = element.querySelector(".blte-text-and-media__content__eyebrow h6");
  const subheading = subheadingElement ? document.createElement("p") : null;
  if (subheadingElement && subheading) {
    subheading.textContent = subheadingElement.textContent.trim();
  }

  // Extract the description
  const descriptionElement = element.querySelector(".blte-text-and-media__content__description p:nth-of-type(2)");
  const description = descriptionElement ? document.createElement("p") : null;
  if (descriptionElement && description) {
    description.textContent = descriptionElement.textContent.trim();
  }

  // Extract the date
  const dateElement = element.querySelector(".blte-font--variant-h6");
  const date = dateElement ? document.createElement("p") : null;
  if (dateElement && date) {
    date.textContent = dateElement.textContent.trim();
  }

  // Extract the CTA
  const ctaElement = element.querySelector(".blte-text-and-media__content__buttons a");
  const cta = ctaElement ? document.createElement("a") : null;
  if (ctaElement && cta) {
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent.trim();
  }

  // Combine all extracted elements into a single cell
  const combinedCell = document.createElement("div");
  [image, title, subheading, date, description, cta].forEach((el) => {
    if (el) combinedCell.appendChild(el);
  });

  // Create the rows for the table
  const rows = [
    headerRow,
    [combinedCell]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element
  element.replaceWith(blockTable);
}