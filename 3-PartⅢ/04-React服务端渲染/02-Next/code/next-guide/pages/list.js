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

//有数据的静态渲染
// export async function getStaticProps () {
//   let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8')
//   return {
//     props: {
//       data
//     }
//   }
// }

// 服务端渲染
export async function getServerSideProps (context) {
  let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8')
  console.log(context.query);
  return {
    props: {
      data
    }
  }
}


