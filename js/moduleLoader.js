'use strict';

const moduleLoader = (function(){
  const loadedModules = [];
  const loadedFiles = [];
  const modules = [];

  // load modules from config, loop through and load each module
  const __loadModules = function(){
    let modules = __getModuleObjects();

    modules.forEach(module => {
      __loadModule(module);
    })
  }
  
  const __loadModule = function(module){
    console.log(`Loading Module: ${module.name}`);
    let path = `${module.path}/${module.fileName}`;

    const __createModule = function () {
      const moduleInstance = Module.create(module.name);
      console.log('modobj', moduleInstance);
      if(moduleInstance){
        __loadModuleFiles(module, moduleInstance);
      } else {
        return;
      }
    }

    if(!loadedModules.includes(path)){
      __loadFile(path)
        .then(() => {
          loadedModules.push(path);
          __createModule();
        })
    } else {
      __createModule();
    }

  }
    // TODO:
  const __loadModuleFiles = function(moduleConfigData, moduleObject){
    console.log(`Loading additional files for: ${moduleConfigData.name} module...`);
    moduleObject.setData(moduleConfigData);

    moduleObject.loadScripts()
      .then(() => moduleObject.loadStyles())
      .then(() => modules.push(moduleObject))
      .then(() => __startModules())
    
  }

  const __loadFile = function(filePath){
    return new Promise((resolve, reject) => {
      const fileType = filePath.slice(filePath.lastIndexOf('.') + 1).toLowerCase();;

      switch(fileType){

        case 'js':
          const scriptArray = Array.from(document.getElementsByTagName('script'));
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = filePath;
          script.onload = () => resolve();
          script.onerror = () => {
            reject(console.error("Error on loading script:", filePath));
          }
          document.getElementsByTagName('body')[0].insertBefore(script, scriptArray[scriptArray.length - 1]);
          break;

        case 'css':
          const link = document.createElement('link');
          link.ref = 'stylesheet';
          link.type = 'text/css'
          link.href = filePath;
          link.onload = () => resolve(link);
          link.onerror = () => {
            reject(console.error("Error on loading style:", filePath));
          }
          document.getElementsByTagName('head')[0].appendChild(link)
          break
        }
    })
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


  const __startModules = function(){
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
      __loadFile(file)
        .then(() => {
          loadedFiles.push(file);
        })
    }
  }
})()