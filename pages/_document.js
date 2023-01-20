import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="InterviewBot Toolbox" key="title"/>
        <meta property="og:description" content="powered by InterviewBot GPT3 AI" key="description"/>
        <meta
          property="og:image"
          content="https://d3q6mrlpga8k3b.cloudfront.net/e7581c22-2dce-4b41-bd15-ed0a235d5425/meta.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
