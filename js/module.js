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
          resolve(console.log(`All scripts loaded for ${this.name} module.`));
        })
    })
  }

  loadStyles(){
    return new Promise((resolve, reject) => {
      this.loadModuleDependancies(this._getStyles())
        .then(() => {
          resolve(console.log(`All styles loaded for ${this.name} module.`));
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

  async loadModuleDependancies(fileArray){
    const promiseArray = [];

    for(const file of fileArray) {
      console.log(file + ' loading...');
      promiseArray.push(moduleLoader.loadFile(`${this.data.path}/${file}`));
    }

    await Promise.allSettled(promiseArray);
    return;
  }

  // get template data and template and render the template
  getDom(){
    return new Promise(async (resolve, reject) => {
      const div = document.createElement('div');
      const templateString = await this._getTemplateString();
      const templateData =  await this._getTemplateData();
      console.log(templateData);
      let html = ejs.render(templateString, templateData)
      div.innerHTML = html;
 
      resolve(div);
    })
  }
  // get template string
  _getTemplateString(){
    return new Promise((resolve, reject) => {
      fetch(`/modules/${this.name}/${this.name}.ejs`)
        .then(response => {
          resolve(response.text());
        })
        .catch(e => {
          reject(() => {
            console.error(e);
            console.log(`No .ejs file found for ${this.name} module`)
          });
        })
    })
  }
  // get data for ejs module
  _getTemplateData(){
    return {};
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
