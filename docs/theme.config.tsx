import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span>
      <strong>Bao UI</strong>
    </span>
  ),
  project: {
    link: 'https://github.com/tothienbao6a0/bao-ui',
  },
  docsRepositoryBase: 'https://github.com/tothienbao6a0/bao-ui/tree/main/docs',
  footer: {
    content: 'Bao UI Docs',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Bao UI" />
      <meta
        property="og:description"
        content="Beautiful React components built on Base UI primitives"
      />
    </>
  ),
}

export default config
