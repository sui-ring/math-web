import path from 'path';
import fs from 'fs/promises'
import { Content } from "./contensts"

const read_contents = async () => {
    try {
        // file read
        const filePath = path.join(process.cwd(), 'src', 'data', 'contents.json')
        // ファイルの存在確認
        try {
            await fs.access(filePath)
        } catch (error) {
            console.error(`File not found: ${filePath}`)
            throw new Error(`Contents file not found: ${filePath}`)
        }
        const jsonData = await fs.readFile(filePath, 'utf8')
        const contents: Content[] = JSON.parse(jsonData)

        if (!contents || !Array.isArray(contents)) {
            throw new Error('Invalid contents format')
        }

        return contents
    } catch (error) {
        console.error('Error reading contents', error)
        throw new Error('Error reading contents')
    }
}


export default read_contents;