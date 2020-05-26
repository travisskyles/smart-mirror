'use strict';

class Module {
  constructor(config){
    this.config = config;
  }

  init(){
    // do something on instantiation
  }

  start(){
    console.log(`starting: ${this.name}`);
  }

  getScripts(){

  }

  getStyles(){

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
