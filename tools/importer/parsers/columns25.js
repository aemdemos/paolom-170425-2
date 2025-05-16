/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Extract header row
    const headerRow = ['Columns'];
    rows.push(headerRow);

    // Extract content rows dynamically
    const contentRow1 = [];
    const contentRow2 = [];

    // First content row: Extracting paragraph and 'Live' button dynamically
    const paragraphElement = element.querySelector('.blte-text p');
    const paragraph = document.createElement('p');
    if (paragraphElement) {
        paragraph.textContent = paragraphElement.textContent.trim();
    }

    const liveButtonElement = element.querySelector('.blte-btn__wrapper a[href="https://www.brightlinewest.com/fra/stage-one-completion-memos-for-ca"]');
    const liveButton = document.createElement('a');
    if (liveButtonElement) {
        liveButton.href = liveButtonElement.href;
        liveButton.textContent = liveButtonElement.textContent.trim();
    }
    contentRow1.push(paragraph, liveButton);

    // Second content row: Extracting description, images, and preview link dynamically
    const description2 = document.createElement('div');
    description2.textContent = "Or you can just view the preview";

    const imageElements = element.querySelectorAll('img');
    const images = Array.from(imageElements).map(img => {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        return newImg;
    });

    const previewLinkElement = element.querySelector('a[href="https://www.brightlinewest.com/fra/stage-one-completion-memos-for-nv"]');
    const previewLink = document.createElement('a');
    if (previewLinkElement) {
        previewLink.href = previewLinkElement.href;
        previewLink.textContent = previewLinkElement.textContent.trim();
    }

    contentRow2.push(...images, [description2, previewLink]);

    rows.push(contentRow1, contentRow2);

    // Create table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace original element with the structured table
    element.replaceWith(table);
}