'use strict';
/**
 *
 *
 * @returns
 */
const moduleLoader = (function(){
  const loadedModules = [];
  const loadedFiles = [];
  const modules = [];

  /**
   * Calls _getModules to get an array of module data objects.
   * Then calls _loadModule on each module data object.
   * @method _loadModules
   * @private
   */
  const _loadModules = function(){
      let modules = _getModuleObjects();

      const loadNext = function(){
        if(modules.length > 0){
          let nextModule = modules[0];
         _loadModule(nextModule)
            .then(() => {
              modules = modules.slice(1);
              loadNext();
            })
        } else {
          _startModules();
        }
      }
      loadNext()
  }

  /**
   * Takes in a module data object.
   * Creates a file path and checks if that module has been loaded.
   * If true calls _createModule.
   * If false calls _loadFile using the file path, pushes
   * the path into loadedModules and calls _createModule.
   * @method _loadModule
   * @private
   * @param {object} module a module data object
   */
  const _loadModule = function(module){
    return new Promise((resolve, reject) => {
      console.log(`Loading Module: ${module.name}`);
      let path = `${module.path}/${module.fileName}`;

      if (!loadedModules.includes(path)) {
        _loadFile(path)
          .then(() => {
            _createModule(module)
              .then(() => {
                loadedModules.push(path);
                resolve();
              })
          })
      } else {
        _createModule(module)
          .then(() => resolve());
      }
    })

  }

  /**
   * Creates a new Module class instance
   * If successfully created, calls _loadModuleFiles to load module accessory files.
   * Otherwise returns
   * @method _createModule
   * @private
   * @param {object} module module data object
   * @returns if unable to create new Module instance
   */
  const _createModule = function(module){
    return new Promise((resolve, reject) => {
      const moduleInstance = Module.create(module.name);
      if (moduleInstance) {
        _loadModuleFiles(module, moduleInstance)
          .then(() => resolve());
      } else {
        resolve();
      }
    })

  }

  /**
   * Sets module data and loads additional files required for module.
   * Adds module instances to modules array.
   * @method _loadModuleFiles
   * @private
   * @param {object} moduleConfigData module data object
   * @param {object} moduleObject module class instance
   */
  const _loadModuleFiles = function(moduleConfigData, moduleObject){
    return new Promise((resolve, reject) => {
      console.log(`Loading additional files for: ${moduleConfigData.name} module...`);
      moduleObject.setConfigData(moduleConfigData);
      moduleObject.loadScripts()
        .then(() => {
          moduleObject.loadStyles()
            .then(() => {
              modules.push(moduleObject);
              resolve();
            })
        })
    })
  }

  /**
   * Load file and appends it to index.html
   * @function _loadFile
   * @private
   * @param {string} filePath path to file from root
   * @returns {promise} returns a promise that resolves once the script is loaded
   */
  const _loadFile = function(filePath){
    return new Promise((resolve, reject) => {
      const fileType = filePath.slice(filePath.lastIndexOf('.') + 1).toLowerCase();
      const name = filePath.slice(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
      let scriptArray;
      let script;

      switch(fileType){

        case 'js':
          scriptArray = Array.from(document.getElementsByTagName('script'));
          script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = filePath;
          script.onload = () => {
            console.log(`${name}.${fileType} loaded`)
            resolve();
          }
          script.onerror = () => {
            reject(console.error("Error on loading script:", filePath));
          }
          document.getElementsByTagName('body')[0].appendChild(script);
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

        case 'tpscript':
          filePath = filePath.slice(0, filePath.lastIndexOf('.'));
          scriptArray = Array.from(document.getElementsByTagName('script'));
          script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = filePath;
          script.onload = () => resolve(script);
          script.onerror = () => {
            reject(console.error("Error on loading script:", filePath));
          }
          document.getElementsByTagName('body')[0].insertBefore(script, scriptArray[scriptArray.length - 1]);
          break;
        }
    })
  }

  /**
  * _getModulesFromConfig()
  * retrieves module data from config file
  * @function _getModulesFromConfig
  * @private
  * @returns {arr} returns an array of modules in config file
  */
  const _getModulesFromConfig = function(){
    console.log(config);
    return config.modules;
  }

  /**
   * _getModuleObjects()
   * parses module data from config into seperate objects
   * return nothing if module is disabled
   * @function _getModuleObjects
   * @private
   * @returns {array} array of module data objects
   */
  const _getModuleObjects = function(){
    const modules = _getModulesFromConfig();
    const moduleObjects = [];
    console.log(modules, moduleObjects);

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

  /**
   * loops through the module instances and calls the start method.
   * Then tells the main method that the modules have been started and passes it the modules.
   * @method _startModules
   * @private
   * 
   */
  const _startModules = function(){
    modules.forEach(module => {
      module.start();
    })
    main.modulesStarted(modules);
  }

  /******************
   * Public Methods *
   ******************/

  return {
    /**
     * Initiates the module loading sequence
     * @function loadModules
     */
    loadModules: function(){
      _loadModules();

    },

    /**
     * Calls the _loadFile method to load a file and records that file.
     * @function loadFile
     * @param {string} file file path in string format
     */
    loadFile: function(file){
      if(loadedFiles.includes(file)){
        console.log(`File already loaded: ${file}`);
        return;
      }
      if(file.includes('node_modules')){
        file = file.substring(file.indexOf('node_modules'));
      }
      const loadedFile = _loadFile(file);
      loadedFiles.push(file);
      return loadedFile;
    }
  }
})()