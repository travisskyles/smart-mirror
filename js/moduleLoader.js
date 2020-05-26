'use strict';

const moduleLoader = (function(){
  const modules = [];

  // load modules from config, loop through and load each module
  const __loadModules = function(){
    let modules = __getModuleObjects();
    
    const __loadNext = function(){
      modules.forEach(module => {
        while(modules.length > 0){
          let nextModule = modules[0];
          __loadModule(module);
          modules = modules.slice(1)
          __loadNext();
        }
      })
      __startModules();
    }
    __loadNext();
  }
  
  const __loadModule = function(module){
    // create var for path to module file
    let path = `${module.path}/${module.fileName}`;
    // TODO:
    // create function to create new module object(class instantiation) and if that returns successfully run function that loads scripts and styles
  }

  /**
  * __getModulesFromConfig
  * retrieves module data from config file
  * @function
  * @returns {arr} returns an array of modules in config file
  */
  const __getModulesFromConfig = function(){
    return config.modules;
  }

  /**
   * __getModuleObjects
   * parses module data from config into seperate objects
   * @function
   * @returns {arr} array of module data
   */
  const __getModuleObjects = function(){
    const modules = __getModulesFromConfig();
    const moduleObjects = [];

    modules.forEach((module, index) => {

      if(module.disabled === true){
        return;
      }

      moduleObjects.push({
        index: index,
        name: module.name,
        position: module.position,
        config: module.config,
        path: `modules/${module.name}`,
        fileName: `${module.name}.js`,
        classes: (module.classes) ?
          `${module.classes} ${module.name}` : module.name,
      })
    })

    return moduleObjects;
  }
  
  // TODO: loop through modules and hit start method
  const __startModules = function(){

  }

  /******************
   * Public Methods *
   ******************/

   return {
     loadModules: function(){
       __loadModules();
     }
   }
})()