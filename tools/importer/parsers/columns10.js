/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract valid content for a single teaser item
  function extractTeaserContent(listItem) {
    // Extract image and anchor elements
    const image = listItem.querySelector('img');
    const anchor = listItem.querySelector('a');

    // Ensure both image and anchor are valid elements
    return image && anchor ? [image, anchor] : [];
  }

  // Extract all teaser lists
  const teasersLists = element.querySelectorAll('.blte-teasers-list__items');

  // Create rows for teaser content
  const teaserRows = Array.from(teasersLists).map((teasersList) => {
    const listItems = Array.from(teasersList.querySelectorAll('li'));
    return listItems.map((listItem) => extractTeaserContent(listItem));
  });

  // Flatten rows and group into columns logically
  const structuredCells = teaserRows.map(row => row.map(teaserContent => teaserContent));

  // Create the block table header
  const headerRow = ['Columns'];

  // Generate the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...structuredCells], document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}