'use strict';

class Module {


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