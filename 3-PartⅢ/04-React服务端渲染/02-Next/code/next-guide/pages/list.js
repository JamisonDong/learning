import Head from 'next/head'
import { readFile } from "fs"
import { promisify } from 'util'
import { join } from "path"

const read = promisify(readFile)

export default function List ({ data }) {
  return (
    <>
      <Head>
        <title>List page</title>
      </Head>
      <div>
        List Page works
      </div>
      <div>
        {data}
      </div>
    </>
  )
}

export async function getStaticProps () {
  let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8')
  return {
    props: {
      data
    }
  }
}


