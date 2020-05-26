'use strict';

const moduleLoader = (function(){
  const loadedModules = [];
  const modules = [];

  // load modules from config, loop through and load each module
  const __loadModules = function(){
    let modules = __getModuleObjects();
    
    modules.forEach(module => {
      __loadModule(module);
      })
      __startModules();

  }
  
  const __loadModule = function(module){
    // create var for path to module file
    let path = `${module.path}/${module.fileName}`;

    // TODO:
    // create function to create new module object(class instantiation) and if that returns successfully run function that loads scripts and styles
    const __createModule = function () {
      const moduleInstance = Module.create(module.name);

      if (moduleInstance) {
        __loadModuleFiles(module, moduleInstance);
      } else {
        return;
      }
    }

    if(!loadedModules.includes(path)){
      __loadFile(path);
      loadedModules.push(path);
      __createModule();
    } else {
      __createModule();
    }

  }
    // TODO:
  const __loadModuleFiles = function(moduleData, moduleObject){
    console.log('moduleData', moduleData);
    console.log('moduleObject', moduleObject);
  }

  const __loadFile = function(filePath){
    const fileType = filePath.slice(filePath.lastIndexOf('.') + 1).toLowerCase();
    console.log('filetype', fileType);

    switch(fileType){
      case 'js':
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = filePath;
        document.getElementsByTagName('body')[0].appendChild(script);
        break;
      case 'css':
        //TODO: add logic for handling css scripts
        break
    }
  }

  /**
  * __getModulesFromConfig()
  * retrieves module data from config file
  * @function
  * @returns {arr} returns an array of modules in config file
  */
  const __getModulesFromConfig = function(){
    return config.modules;
  }

  /**
   * __getModuleObjects()
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