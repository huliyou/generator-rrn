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
    // this.option('port', {type: Number, defaults: '8000'});
    // this.option('projectVersion', {type: String, defaults: '1.0.0'});
    // this.option('author', {type: String, defaults: ''});
    // this.option('useCssMoudles', {type: Boolean, defaults: true});
  },
  prompting: function () {
    return this.prompt([
    { // 项目名称
      type    : 'input',
      name    : 'projectName',
      message : 'Your project name ?',
      default : this.appname // Default to current folder name
    },
    // { // 项目版本
    //   type    : 'input',
    //   name    : 'projectVersion',
    //   message : 'Your project version ?',
    //   default: this.options.projectVersion,
    // },
    // { // 作者
    //   type    : 'input',
    //   name    : 'author',
    //   message : 'Your name ?',
    //   default: this.options.author,
    // },
    // { // 端口号
    //   type    : 'input',
    //   name    : 'port',
    //   message : 'Your dev server port ?',
    //   default : this.options.port,
    // },
    // // javascript type
    // {
    //   type    : 'list',
    //   name    : 'javascriptType',
    //   message : 'Your javascript type ?',
    //   choices : ['flow', 'typescript'],
    // },
    // // use css module ?
    // {
    //   type    : 'confirm',
    //   name    : 'useCssModules',
    //   message : 'Use css modules ?',
    //   default : this.options.useCssMoudles,
    // },
    // // css preprocessors
    // {
    //   type    : 'checkbox',
    //   name    : 'cssPreprocessors',
    //   message : 'css preprocessors ?',
    //   choices : ['cssnext', 'sass', 'less']
    // }
  ]).then(function (answers) {
      this.projectName = answers.projectName;
      // this.version = answers.projectVersion;
      // this.author = answers.author;
      // this.port = answers.port;
      // this.javascriptType = answers.javascriptType;
      // this.useCssModules = answers.useCssModules;
      // this.cssPreprocessors = answers.cssPreprocessors;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('./android'),
      this.destinationPath(this.projectName + '/android')
    );
    this.fs.copy(
      this.templatePath('./ios'),
      this.destinationPath(this.projectName + '/ios')
    );
    this.fs.copyTpl(
      this.templatePath('*.*'),
      this.destinationPath(this.projectName + '/'),
      {
        projectName: this.projectName,
        // projectVersion: this.version,
        // author: this.author,
        // port: this.port,
        // javascriptType: this.javascriptType,
        // useCssModules: this.useCssModules,
        // cssPreprocessors: this.cssPreprocessors,
      }
    );
    this.fs.copyTpl(
      this.templatePath('.*'),
      this.destinationPath(this.projectName + '/'),
      {
        projectName: this.projectName,
        // projectVersion: this.version,
        // author: this.author,
        // port: this.port,
        // javascriptType: this.javascriptType,
        // useCssModules: this.useCssModules,
        // cssPreprocessors: this.cssPreprocessors,
      }
    );
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath(this.projectName + '/.babelrc'),
      {
        // javascriptType: this.javascriptType,
      }
    );
    // if (this.javascriptType === 'flow') {
    //   this.fs.copyTpl(
    //     this.templatePath('.flowconfig'),
    //     this.destinationPath(this.projectName + '/.flowconfig')
    //   );
    // }
  },
  install: function() {

  },
  done: function () {
    this.log('done');
  }
});
