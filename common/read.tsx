import path from 'path';
import fs from 'fs/promises'
import { Content } from "./contensts"

const read_contents = async () => {
    // file read
    const filePath = path.join(process.cwd(), '/src/data/contents.json')
    const jsonData = await fs.readFile(filePath, 'utf8')
    const contents: Content[] = JSON.parse(jsonData)

    return contents
}

export default read_contents;