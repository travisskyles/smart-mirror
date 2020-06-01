'use strict';

const Module = class {
  constructor(){
    const _defaults = {};
  }

  init(){
    // do something on instantiation
  }

  start(){
    console.log(`Starting: ${this.name} module`);
  }

  _getScripts(){
    return [];
  }

  _getStyles(){
    return [];
  }
  /**
   *
   *
   * @returns {promise}
   */
  loadScripts() {
    return new Promise((resolve, reject) => {
      this.loadModuleDependancies(this._getScripts())
        .then(() => {
          console.log(`Scripts loaded for ${this.name} module.`);
          resolve();
        })
    })
  }

  loadStyles(){
    return new Promise((resolve, reject) => {
      this.loadModuleDependancies(this._getStyles())
        .then(() => {
          console.log(`Styles loaded for ${this.name} module.`);
          resolve();
        })
    })
  }

  setConfigData(configData){
    this.data = configData;
    this.name = configData.name;
    this.setConfig(configData.config);
  }

  setConfig(moduleConfig){
    this.config = Object.assign({}, this._defaults, moduleConfig);
  }

  loadModuleDependancies(fileArray){
    return new Promise((resolve, reject) => {
      fileArray.forEach(file => {
        moduleLoader.loadFile(`${this.data.path}/${file}`);
      })
      resolve();
    })
  }

  // get template data and template and render the template
  getDom(){
    return new Promise(async (resolve, reject) => {
      const div = document.createElement('div');
      const templateString = await this._getTemplateString();
      const templateData =  await this._getTemplateData();

      let html = ejs.render(templateString, templateData)
      console.log(html);
      div.innerHTML = html;
 
      resolve(div);
    })
  }
  // get template string
  _getTemplateString(){
    return new Promise((resolve, reject) => {
      let template = fetch(`/modules/${this.name}/${this.name}.ejs`)
        .then(response => response.text());
      resolve(template);
    })
  }
  // get data for ejs module
  _getTemplateData(){

  }

  static register(name, definition){
    Module.definitions[name] = definition;
  }

  static create(name){
    const module = new Module;
    Object.keys(Module.definitions[name]).forEach(key => {
      module[key] = Module.definitions[name][key];
    })
    return module;
  }
}

Module.definitions = {};
