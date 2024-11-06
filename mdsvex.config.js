import { defineMDSveXConfig as defineConfig } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkFootnotes from 'remark-footnotes'
import remarkGithub from 'remark-github'
import remarkToc from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

const config = defineConfig({
  extensions: ['.svelte', '.svx', '.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    remarkUnwrapImages,
    [remarkToc, { tight: true }],
    [
      remarkGithub,
      {
        repository: 'https://github.com/ismaelpamplona/isma.codes'
      }
    ],
    remarkFootnotes
  ],
  rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings]
})

export default config
