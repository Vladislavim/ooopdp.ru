/**
 * Footer contract shared by the homepage and inner-page shell.
 * template.html is a migrated copy of the approved homepage footer.
 */
export const footerBlock = Object.freeze({
  id: 'footer',
  slot: 'data-site-footer',
  source: 'src/blocks/footer/template.html',
});

export const renderFooterSlot = () => '<div data-site-footer></div>';
