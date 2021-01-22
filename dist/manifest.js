const dirTree = require("directory-tree")
const crypto = require('crypto')
const fs = require('fs')

let manifest = {
	version: require('../package.json').version,
	files: {}
}
dirTree("./dist", undefined, (item, path, stats) =>
{
	let fname = item.path.replace(/^dist\//, '')
	let fcont = fs.readFileSync(item.path).toString('utf8')
	manifest.files[fname] = {
		"hash": crypto.createHash('sha256').update(fcont).digest('hex'),
		"size": stats.size
	}
})

fs.writeFileSync("./dist/manifest.json", JSON.stringify(manifest))
