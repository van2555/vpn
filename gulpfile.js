import {src, dest, watch, series } from "gulp"
import fileInclude from "gulp-file-include"
import browser from "browser-sync"
const bs = browser.create()
function html() {
    return src(["src/**/*.html", "src/**/*.css", "!src/ui/**/*.html"]).pipe(
        fileInclude({
            prefix: "@@",
            basepath: "src",
        }),
    ).pipe(dest("dist"))
}
function imgs() {
    return src(["src/**/*.{png,jpg,webp}"], {encoding: false}).pipe(dest("dist"))
}
function server(done) {
    bs.init({
        server: {
            baseDir: "dist",

        },
        notify: false,
    })
    done()
}
function reload(done) {
    bs.reload();
    done();
}

function watcher() {
    // Тут была проблема не было css в watch
    watch("src/**/*.{html,css}", series(html, reload));
    watch("src/**/*.{png,jpg,webp}", series(imgs, reload));
}
export default series(imgs, html, server, watcher);
