import fs from 'fs'
import path from 'path'

// function pathJoin(parts, sep){
//     var separator = sep || '/';
//     var replace   = new RegExp(separator+'{1,}', 'g');
//     return parts.join(separator).replace(replace, separator);
//  }
 
const root = process.cwd()

export async function getAllFilesMatter(type) {
    const files = fs.readdirSync(path.join(root, 'data', type))

    return files.reduce((allJSON, contentSlug) => {
        const source = fs.readFileSync(
            path.join(root, 'data', type, contentSlug),
            'utf8'
        )
        const data = JSON.parse(source)
        return [
            {
                ...data,
                slug: contentSlug.replace('.json', '')
            },
            ...allJSON
        ]
    }, [])
}