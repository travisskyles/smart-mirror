'use strict';

const Module = class {
  constructor(){
    const __defaults = {};
  }

  init(){
    // do something on instantiation
  }

  start(){
    console.log(`starting: ${this.name} module.`);
  }

  getScripts(){
    return [];
  }

  getStyles(){
    return [];
  }

  loadScripts(){
    this.loadModuleDependancies(this.getScripts());
    console.log(`Scripts loaded for ${this.name} module.`);
  }

  loadStyles(){
    this.loadModuleDependancies(this.getStyles());
    console.log(`Styles loaded for ${this.name} module.`);
  }

  setData(configData){
    this.data = configData;
    this.name = configData.name;
    this.config = this.setConfig(configData.config);
  }

  setConfig(moduleConfig){
    Object.assign({}, this.__defaults, moduleConfig);
  }

  loadModuleDependancies(fileArray){
    fileArray.forEach(file => {
      moduleLoader.loadFile(`${this.path}/${file}`);
    })
  }

  static register(name, definition){
    Module.definitions[name] = definition;
    console.log(Module.definitions);
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
