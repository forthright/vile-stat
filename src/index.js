const fs = require("fs")
const path = require("path")
const unixify = require("unixify")
const _ = require("lodash")
const detect = require("language-detect")
const language = require("language-map")
const sloc = require("sloc")
const vile = require("vile")
const log = vile.logger.create("stat")

const ext_from_lang_map = (lang) =>
  _.first(_.get(language[lang], "extensions"))

const filepath_ext = (filepath, lang) =>
  _.toString(path.extname(filepath) || ext_from_lang_map(lang))

const into_stat_issue = (filepath, filedata) => {
  let loc
  let lang = detect.contents(filepath, filedata)

  // HACK: language-detect reports .ts as XML
  if (/\.ts$/.test(filepath)) { lang = "TypeScript" }

  try {
    const ext = filepath_ext(filepath, lang)
    loc = sloc(filedata, ext.replace(/^\./, ""))
  } catch(error) {
    if (/not supported/i.test(_.toString(error))) {
      const msg = _.get(error, "message", error) + ` (${filepath})`
      log.warn(msg)
    } else {
      throw error
    }
  }

  const file_stat = fs.statSync(filepath)

  const issue = vile.issue({
    type: vile.STAT,
    path: unixify(filepath),
    stat: {
      size: file_stat.size,
      language: lang
    }
  })

  if (loc) {
    issue.stat.loc = _.get(loc, "source")
    issue.stat.lines = _.get(loc, "total")
    issue.stat.comment = _.get(loc, "comment")
  }

  return issue
}

const allowed = (config) => {
  const ignore_config = _.get(config, "ignore", [])
  const allow_config = _.get(config, "allow", [])
  return (file, is_dir) =>
    is_dir ||
      (vile.allowed(file, allow_config) &&
        !vile.ignored(file, ignore_config))
}

const punish = (config) =>
  vile.promise_each(
    process.cwd(),
    allowed(config),
    into_stat_issue)

module.exports = {
  punish: punish
}
