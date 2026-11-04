import assert from 'node:assert/strict';
import { test } from 'node:test';

import { nieuwstePerBundel } from './bundel-lastmod.js';

test('sleutel komt overeen met .File.Dir van Hugo', () => {
  assert.deepEqual(
    nieuwstePerBundel([{ pad: 'content/over-moza/roadmap/roadmap.yaml', datum: '2026-10-28T11:35:57+01:00' }]),
    { 'over-moza/roadmap/': '2026-10-28T11:35:57+01:00' },
  );
});

test('neemt per bundel het nieuwste bestand, ook over tijdzones heen', () => {
  assert.deepEqual(
    nieuwstePerBundel([
      { pad: 'content/a/een.yaml', datum: '2026-10-28T00:30:00+02:00' },
      { pad: 'content/a/twee.yaml', datum: '2026-10-27T23:00:00+00:00' },
      { pad: 'content/b/drie.yaml', datum: '2026-01-01T00:00:00+01:00' },
    ]),
    {
      'a/': '2026-10-27T23:00:00+00:00',
      'b/': '2026-01-01T00:00:00+01:00',
    },
  );
});

test('slaat een bestand zonder git-datum over', () => {
  assert.deepEqual(nieuwstePerBundel([{ pad: 'content/a/nieuw.yaml', datum: '' }]), {});
});
