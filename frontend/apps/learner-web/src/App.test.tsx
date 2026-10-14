import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('learner home shell', () => {
  it('shows a PSM I starting point without pretending content is playable', () => {
    const html = renderToStaticMarkup(<App />);
    expect(html).toContain('A little Scrum, one day at a time.');
    expect(html).toContain('Meet the Scrum Team');
    expect(html).toContain('Content coming soon');
    expect(html).toContain('disabled=""');
  });
});
