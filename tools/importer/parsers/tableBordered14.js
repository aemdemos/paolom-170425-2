/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row based on the example
  const headerRow = ['Table (bordered)'];

  // Extract navigation items
  const navItems = Array.from(element.querySelectorAll('div.blte-nav-item')); 

  // Create rows for the table based on extracted navigation items
  const navRows = navItems.map((navItem) => {
    const navButton = navItem.querySelector('button.blte-nav-item-header');
    const navLabel = navButton ? navButton.getAttribute('aria-label') : null;

    // Extract submenu links
    const submenu = navItem.querySelectorAll('ul.blte-nav-item__submenu li a');
    const links = Array.from(submenu).map((link) => link);

    // Only add rows with meaningful data
    if (navLabel && links.length > 0) {
      return [navLabel, links];
    }

    // Skip rows with incomplete or missing data
    return null;
  }).filter(row => row !== null); // Remove null rows

  // Construct table data
  const tableData = [headerRow, ...navRows];

  // Create the table using WebImporter.DOMUtils.createTable
  const navigationTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured table
  element.replaceWith(navigationTable);
}