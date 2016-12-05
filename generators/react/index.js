var yeoman = require('yeoman-generator');
var Base = yeoman.Base;
var Path = require('path');
var fs = require('fs');

function camelCase(name) {
  return name.replace(/-\w/g, function (m) {
    return m.charAt(1).toUpperCase();
  })
}

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.option('port', {type: Number, defaults: '8000'});
    this.option('projectVersion', {type: String, defaults: '1.0.0'});
    this.option('author', {type: String, defaults: ''});
    this.option('pkgName', {type: String, defaults: ''});
    this.option('repoUrl', {type: String, defaults: ''});
  },
  prompting: function () {
    return this.prompt([
    { // 项目名称
      type    : 'input',
      name    : 'projectName',
      message : 'Your project name ?',
      default : this.appname // Default to current folder name
    },
    { // 项目版本
      type    : 'input',
      name    : 'projectVerion',
      message : 'Your project version ?',
      default: this.options.projectVersion,
    },
    { // 作者
      type    : 'input',
      name    : 'author',
      message : 'Your name ?',
      default: this.options.author,
    },
    { // 端口号
      type    : 'input',
      name    : 'port',
      message : 'Your dev server port ?',
      default : this.options.port,
    }
  ]).then(function (answers) {
      // this.option('projectName', answers.projectName);
      // this.option('version', answers.version);
      this.projectName = answers.projectName;
      this.version = answers.projectVersion;
      this.port = answers.port
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath(this.projectName + '/'),
      {
        projectName: this.projectName,
        projectVersion: this.projectVersion,
        author: this.author,
        port: this.port,
      }
    );
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath(this.projectName + '/.babelrc'),
      {
        projectName: this.projectName,
        projectVersion: this.projectVersion,
        author: this.author
      }
    );
  },
  install: function() {

  },
  done: function () {
    this.log('done');
  }
});
