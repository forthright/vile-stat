let fs = require("fs")
let path = require("path")
let Promise = require("bluebird")
let _ = require("lodash")
let detect = require("language-detect")
let language = require("language-map")
let sloc = require("sloc")
let vile = require("@forthright/vile")
let log = vile.logger.create("stat")

let ext_from_lang_map = (lang) =>
  _.first(_.get(language[lang], "extensions"))

let filepath_ext = (filepath, lang) =>
  path.extname(filepath) ||
    ext_from_lang_map(lang) ||
      "?"

let into_stat_issue = (filepath, filedata) => {
  let loc
  let file_stat = fs.statSync(filepath)
  let lang

  // HACK: prevents weird bug when file path ex does not exist
  if (/\.[^\.]+$/.test(filepath)) {
    lang = detect.sync(filepath)
  } else {
    lang = ""
  }

  // HACK: language-detect reports .ts as XML
  if (/\.ts$/.test(filepath)) lang = "TypeScript"

  try {
    let ext = filepath_ext(filepath, lang)
    loc = sloc(filedata, ext.replace(/^\./, ""))
  } catch(error) {
    if (!error.toString().match(/not supported/i)) {
      throw error
    } else {
      log.warn(_.get(error, "message", error) + ` (${filepath})`)
    }
  }

  let issue = vile.issue({
    type: vile.STAT,
    path: filepath,
    stat: { size: file_stat.size }
  })

  if (loc) {
    issue.stat.loc = loc.source
    issue.stat.lines = loc.total
    issue.stat.comment = loc.comment
  }

  return issue
}

let allowed = (config) => {
  let ignore_config = _.get(config, "ignore", [])
  let allow_config = _.get(config, "allow", [])
  return (file, is_dir) =>
    is_dir ||
      (vile.allowed(file, allow_config) &&
        !vile.ignored(file, ignore_config))
}

let punish = (config) =>
  vile.promise_each(
    process.cwd(),
    allowed(config),
    into_stat_issue)

module.exports = {
  punish: punish
}
