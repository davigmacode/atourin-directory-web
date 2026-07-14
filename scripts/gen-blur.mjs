/**
 * scripts/gen-blur.mjs
 *
 * Generate blurDataURL (base64) untuk daftar image URL menggunakan Plaiceholder.
 * Output dicetak ke console dalam format JSON — bisa di-copy ke migration seed
 * atau dipakai oleh AI agent untuk update data.
 *
 * Usage:
 *   node scripts/gen-blur.mjs
 *   node scripts/gen-blur.mjs --url "https://example.com/image.jpg"
 *
 * Tambahkan URL baru di array IMAGES di bawah, atau lewatkan via --url flag.
 */

import { getPlaiceholder } from 'plaiceholder';

// ── Daftar images untuk di-generate ──────────────────────────────────────────
const IMAGES = [
  { id: 'sumatera',   url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70' },
  { id: 'jawa',       url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70' },
  { id: 'kalimantan', url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70' },
  { id: 'sulawesi',   url: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=900&auto=format&fit=crop&q=70' },
  { id: 'papua',      url: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&auto=format&fit=crop&q=70' },
  { id: 'bali-nusa',  url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=70' },
  { id: 'maluku',     url: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=900&auto=format&fit=crop&q=70' },
];

// ── Handle --url flag ─────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const urlFlagIdx = args.indexOf('--url');
const singleUrl = urlFlagIdx !== -1 ? args[urlFlagIdx + 1] : null;

const targets = singleUrl
  ? [{ id: 'custom', url: singleUrl }]
  : IMAGES;

// ── Generate ──────────────────────────────────────────────────────────────────
async function generate(id, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64, color } = await getPlaiceholder(buffer, { size: 10 });
    return { id, url, base64, dominantColor: color.hex };
  } catch (err) {
    console.error(`  ✗ ${id}: ${err.message}`);
    return { id, url, base64: null, error: err.message };
  }
}

async function main() {
  console.log(`Generating blurDataURL for ${targets.length} image(s)...\n`);
  const results = [];

  for (const { id, url } of targets) {
    process.stdout.write(`  → ${id} ... `);
    const result = await generate(id, url);
    process.stdout.write(result.base64 ? '✓\n' : '✗\n');
    results.push(result);
  }

  console.log('\n── Results (JSON) ───────────────────────────────────────────\n');
  console.log(JSON.stringify(results, null, 2));

  // Format siap pakai untuk SQL seed
  console.log('\n── SQL seed format ──────────────────────────────────────────\n');
  for (const r of results) {
    if (r.base64) {
      const cover = JSON.stringify({ url: r.url, blurhash: null, base64: r.base64 });
      console.log(`  ('${r.id}', ..., '${cover}'),`);
    }
  }
}

main();
