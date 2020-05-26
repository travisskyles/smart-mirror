'use strict';

class Module {
  constructor(moduleConfig, moduleDefault){
    this.defaults = defaults;
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
}

Module.register = function(name, definition){
  
}