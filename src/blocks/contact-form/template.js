/** Contact form contract; visual markup stays in the production CTA surface. */
export const contactFormBlock = Object.freeze({
  id: 'contact-form',
  slot: 'data-cta',
  source: 'src/blocks/contact-form/template.html',
});

export const renderContactFormSlot = () => '<div data-cta></div>';
