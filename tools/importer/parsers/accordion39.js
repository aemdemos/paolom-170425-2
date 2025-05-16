/* global WebImporter */
export default function parse(element, { document }) {
    const items = element.querySelectorAll('.blte-accordion-item');

    const cells = [['Accordion']]; // Header row

    items.forEach((item) => {
        const titleButton = item.querySelector('.blte-accordion-item__title');
        const content = item.querySelector('.blte-accordion-item__content');

        if (titleButton && content) {
            const titleText = titleButton.textContent.trim();

            // Extract content text and links
            const contentElements = [];
            const contentText = content.querySelectorAll('span, a');

            contentText.forEach((el) => {
                if (el.tagName === 'A') {
                    const link = document.createElement('a');
                    link.href = el.href;
                    link.textContent = el.textContent.trim();
                    contentElements.push(link);
                } else {
                    contentElements.push(document.createTextNode(el.textContent.trim()));
                }
            });

            cells.push([titleText, contentElements]);
        }
    });

    const hr = document.createElement('hr');
    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(hr, block);
}