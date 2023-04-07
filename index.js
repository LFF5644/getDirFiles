const fs=require("fs");

const sub=process.platform==="win32"?"\\":"/";

function directoryToFiles(dir){
	let directories=[dir];
	let foundDirectories;
	const files=[];
	do{
		let scannedDirectories=[];
		foundDirectories=[];
		for(const directory of directories){
			scannedDirectories.push(directory);
			let itemsInDirectory;
			try{
				itemsInDirectory=fs.readdirSync(directory);
			}catch(e){
				console.log(`cant read directory ${directory}\n\n`);
				throw e;
			}
			for(let item of itemsInDirectory){
				item=directory+item;
				const stat=fs.lstatSync(item);
				if(stat.isFile()) files.push(item);
				else if(stat.isDirectory()) foundDirectories.push(item+sub);
				else console.log("unknown item: "+item);
			}
		}
		directories=[
			...directories.filter(directory=>
				!scannedDirectories.includes(directory)
			),
			...foundDirectories,
		];
	}
	while(foundDirectories.length>0);
	return files;
}

module.exports={
	getFiles: directoryToFiles,
};
