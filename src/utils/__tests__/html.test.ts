import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../html';

describe('escapeHtml', () => {
  it('neutraliza marcação e atributos antes do PDF', () => {
    expect(escapeHtml('<img src=x onerror="alert(1)"> & cliente'))
      .toBe('&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; cliente');
  });

  it('trata valores ausentes como texto vazio', () => {
    expect(escapeHtml(undefined)).toBe('');
  });
});
