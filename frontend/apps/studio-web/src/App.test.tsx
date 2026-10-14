import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Studio library shell', () => {
  it('shows the planned PSM I chapter list and keeps unimplemented authoring disabled', () => {
    const html = renderToStaticMarkup(<App />);
    expect(html).toContain('Professional Scrum Master I');
    expect(html).toContain('Why Scrum');
    expect(html).toContain('Your toolkit');
    expect(html).toContain('New chapter');
    expect(html).toContain('disabled=""');
  });
});
