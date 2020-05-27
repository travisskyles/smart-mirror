'use strict';

const moduleLoader = (function(){
  const loadedModules = [];
  const loadedFiles = [];
  const modules = [];

  // load modules from config, loop through and load each module
  const __loadModules = function(){
    let modules = __getModuleObjects();
    
    const __loadNext = function(){
      if(modules.length > 0) {
        let nextModule = modules[0];
        __loadModule(nextModule, function () {
          modules = modules.slice(1);
          __loadNext;
        })
      }
      __startModules();
    }
    __loadNext();
  }
  
  const __loadModule = function(module, callback){
    console.log(`Loading Module: ${module.name}`);
    let path = `${module.path}/${module.fileName}`;

    const __createModule = function () {
      const moduleInstance = Module.create(module.name);

      if (moduleInstance) {
        __loadModuleFiles(module, moduleInstance, function(){
          modules.push(moduleInstance);
        });
      } else {
        return;
      }
    }

    if(!loadedModules.includes(path)){
      __loadFile(path, function(){
        loadedModules.push(path);
        __createModule();
      });
    } else {
      __createModule();
    }

  }
    // TODO:
  const __loadModuleFiles = function(moduleConfigData, moduleObject, callback){
    console.log(`Loading additional files for: ${moduleConfigData.name}...`);
    moduleObject.setData(moduleConfigData);

    moduleObject.loadScripts();
    moduleObject.loadStyles();

    callback();
  }

  const __loadFile = function(filePath, callback){
    const fileType = filePath.slice(filePath.lastIndexOf('.') + 1).toLowerCase();;

    switch(fileType){

      case 'js':
        const scriptArray = Array.from(document.getElementsByTagName('script'));
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = filePath;
        script.onload = function () {
          if (typeof callback === "function") { callback(); }
        };
        script.onerror = function () {
          console.error("Error on loading script:", filePath);
          if (typeof callback === "function") { callback(); }
        };
        document.getElementsByTagName('body')[0].insertBefore(script, scriptArray[scriptArray.length - 1]);
        break;

      case 'css':
        const link = document.createElement('link');
        link.ref = 'stylesheet';
        link.type = 'text/css'
        link.href = filePath;
        script.onload = function () {
          if (typeof callback === "function") { callback(); }
        };
        script.onerror = function () {
          console.error("Error on loading style:", filePath);
          if (typeof callback === "function") { callback(); }
        };
        document.getElementsByTagName('head')[0].appendChild(link)
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
    console.log('here');
    modules.forEach(module => {
      module.start();
    })
  }

  /******************
   * Public Methods *
   ******************/

  return {
    loadModules: function(){
      __loadModules();
    },

    loadFile: function(file){
      if(loadedFiles.includes(file)){
        console.log(`File already loaded: ${file}`);
        return;
      }
      __loadFile(file, function(){
        loadedFiles.push(file);
        console.log(loadedFiles);
      });
    }
  }
})()