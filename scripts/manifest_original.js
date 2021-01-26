const dirTree = require("directory-tree")
const crypto = require('crypto')
const fs = require('fs')
const path = core.getInput('path', { required: true })

let manifest_original = {
	version: require('../package.json').version,
	files: {}
}
dirTree("./${path}", undefined, (item, path, stats) =>
{
	let fname = item.path.replace(/^dist\//, '')
	let fcont = fs.readFileSync(item.path).toString('utf8')
	manifest_original.files[fname] = {
		"hash": crypto.createHash('sha256').update(fcont).digest('hex'),
		"size": stats.size
	}
})

fs.writeFileSync("./${path}/manifest_original.json", JSON.stringify(manifest_original))
