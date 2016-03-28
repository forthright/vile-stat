"use strict";

var fs = require("fs");
var path = require("path");
var Promise = require("bluebird");
var _ = require("lodash");
var detect = require("language-detect");
var language = require("language-map");
var sloc = require("sloc");
var vile = require("@forthright/vile");
var log = vile.logger.create("stat");

var ext_from_lang_map = function ext_from_lang_map(lang) {
  return _.first(_.get(language[lang], "extensions"));
};

var filepath_ext = function filepath_ext(filepath, lang) {
  return path.extname(filepath) || ext_from_lang_map(lang) || "NO_EXT";
};

var into_stat_issue = function into_stat_issue(filepath, filedata) {
  var loc = void 0;
  var file_stat = fs.statSync(filepath);
  var lang = detect.sync(filepath);

  // HACK: language-detect reports .ts as XML
  if (/\.ts$/.test(filepath)) lang = "TypeScript";

  try {
    var ext = filepath_ext(filepath, lang);
    loc = sloc(filedata, ext.replace(/^\./, ""));
  } catch (error) {
    if (!error.toString().match(/not supported/i)) {
      throw error;
    } else {
      log.warn(_.get(error, "message", error) + (" (" + filepath + ")"));
    }
  }

  var issue = vile.issue({
    type: vile.STAT,
    path: filepath,
    stat: { size: file_stat.size }
  });

  if (loc) {
    issue.stat.loc = loc.source;
    issue.stat.lines = loc.physical;
    issue.stat.comment = loc.comment;
  }

  return issue;
};

var allowed = function allowed(config) {
  var ignore_config = _.get(config, "ignore", []);
  var allow_config = _.get(config, "allow", []);
  return function (file, is_dir) {
    return is_dir || vile.allowed(file, allow_config) && !vile.ignored(file, ignore_config);
  };
};

var punish = function punish(config) {
  return vile.promise_each(process.cwd(), allowed(config), into_stat_issue);
};

module.exports = {
  punish: punish
};