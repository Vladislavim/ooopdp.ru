/**
 * Header contract shared by the homepage and inner-page shell.
 * The canonical markup is generated to template.html from the approved
 * homepage during migration; the existing inner shell still hydrates its
 * data-site-header slot at runtime.
 */
export const headerBlock = Object.freeze({
  id: 'header',
  slot: 'data-site-header',
  source: 'src/blocks/header/template.html',
});

export const renderHeaderSlot = () => '<div data-site-header></div>';
