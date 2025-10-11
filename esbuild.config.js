let esbuild = require("esbuild");
let fs = require("fs");
let path = require("path");

async function run() {
    let pagesDir = "pages";
    let pagesEntryPoints = [];
    for (let dir of fs.readdirSync(pagesDir, { withFileTypes: true })) {
        if (!dir.isDirectory()) {
            continue;
        }
    
        let srcDir = path.join(pagesDir, dir.name, "src");
        let files;
        try {
            files = fs.readdirSync(srcDir);
        } catch (e) {
            console.log("No such directory", srcDir);
            continue;
        }
        let indexFile = files.find(f => /^index\.(ts|js)$/.test(f));
        if (indexFile !== undefined) {
            let fullEntryPoint = path.join(srcDir, indexFile);
            pagesEntryPoints.push([
                dir.name, // page name
                path.join(pagesDir, dir.name, "dist", dir.name, "scripts", "bundle.js"), // output bundle file
                fullEntryPoint, // index path
            ]);
        }
    }
    
    for (let i = 0; i < pagesEntryPoints.length; i++) {
        await esbuild.build({
            entryPoints: [pagesEntryPoints[i][2]],
            bundle: true,
            outfile: pagesEntryPoints[i][1],
            format: "iife",
            splitting: false,
            minify: false,
            // logLevel: "debug",
        }).then(() => {
            console.log("Built", pagesEntryPoints[i][2]);
        }).catch((e) => {
            console.error("Failed to build " + pagesEntryPoints[i][2], e);
        });
    }

    // for each folder in pages
    // in the dist folder
    // copy the main folder
    // copy and rename the index.html file
    for (let dir of fs.readdirSync(pagesDir, { withFileTypes: true })) {
        if (!dir.isDirectory()) {
            continue;
        }

        let distDir = path.join(pagesDir, dir.name, "dist");
        let pageFilesDir = path.join(distDir, dir.name);
        let pageFilesDestination = dir.name;
        fs.cpSync(pageFilesDir, pageFilesDestination, { recursive: true });

        let htmlFile = path.join(distDir, "index.html");
        let htmlFileDestination = dir.name + ".html";
        fs.copyFileSync(htmlFile, htmlFileDestination);
        console.log("Copied project", dir.name);
    }
}

run();
