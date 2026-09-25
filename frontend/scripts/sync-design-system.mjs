// Copyright (c) 2026 Sidero Labs, Inc.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.

// Vendors the generated design system stylesheets from a release tag of
// siderolabs/talos-design-system. Usage: npm run sync:design-system -- v0.3.4
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const tag = process.argv[2]

if (!/^v\d+\.\d+\.\d+$/.test(tag ?? '')) {
  console.error('Pass a release tag, e.g. npm run sync:design-system -- v0.3.4')
  process.exit(1)
}

const files = ['tokens.css', 'tailwind-colour.css']
const out = fileURLToPath(new URL('../src/design-system/', import.meta.url))

mkdirSync(out, { recursive: true })

for (const file of files) {
  const url = `https://raw.githubusercontent.com/siderolabs/talos-design-system/${tag}/dist/${file}`
  const res = await fetch(url)

  if (!res.ok) {
    console.error(`${url}: ${res.status} ${res.statusText}`)
    process.exit(1)
  }

  writeFileSync(
    `${out}${file}`,
    `/* talos-design-system ${tag}, dist/${file} */\n${await res.text()}`,
  )
  console.log(`src/design-system/${file} <- ${tag}`)
}
