'use strict'

let main = (function(){
  // const modules = [];



  function _loadConfig(){
    if (typeof config === 'undefined') {
      config = defaults
      console.log('Missing config file. Reverting to default settings. Create config file to customize.')
      return
    } else {
      config = Object.assign({}, defaults, config)
      console.log('Configuration file loaded..')

      if(!_checkModuleLocations()){
        console.log('multiple modules occupying same area...')
      }else {
        console.log('module locations verified...')
      }
    }
  }

  function _checkModuleLocations(){
    let positionsObj = {}

    for (let i = 0; i < config.modules.length; i++) {
      if(!positionsObj[config.modules[i].position]){
        positionsObj[config.modules[i].position] = 1;
      }else {
        positionsObj[config.modules[i].position]++;
      }
    }

    Object.values(positionsObj).forEach(value => {
      if(value >= 2) return false;
    })

    return true
  }

  function _modulesStarted(modules){
    //TODO: what to do once modules have been loaded and started
    _setModuleDoms(modules);
  }
  // function _loadModules(){
  //   console.log('loading modules...')

  //   config.modules.forEach(module => {
  //     modules[module.name] = { methods: window[module.name] }
  //     // modules[module.name].methods.init();
  //     modules.names.push(module.name)
  //   })
  //   _setModuleInitData();
  //   _setModuleDoms()
  //   console.log(modules)
  // }

  function _setModuleDoms(modules){
    console.log('creating module doms...')

    if (modules.length === 0) {
      console.log('modules not loaded...')
      return;
    }

    modules.forEach(module => {
      console.log(module);
      const parentClasses = module.data.position.replace('_', ' ')
      const parent = document.getElementsByClassName(parentClasses)

      if(parent.length > 0) {
        const wrapper = parent[0].getElementsByClassName('container')
        wrapper[0].classList.add('module');
        module.data.classes.split(' ').forEach(name => {
          wrapper[0].classList.add(name);
        })
        module.getDom()
          .then(html => {
            wrapper.appendChild(html);
          })
      }
    })
  }

  // async function _setModuleInitData(){
  //   for (let i = 0; i < modules.names.length; i++) {
  //     let name = modules.names[i];

  //     try{
  //       let data = await modules[name].methods.getData()
  //       modules[name].data = data;
  //       console.log('data', modules)
  //       _insertModuleData();
  //     }
  //     catch(e){
  //       console.error(e);
  //     }

  //   }
  // }

  // function _insertModuleData(){
  //   console.log(modules.weather.data)
  //   modules.weather.methods.createDom(modules.weather.data)
  // }

  /**
  * Public Methods
  **/
  return{
    init: function(){
      _loadConfig();
    },

    start: function(){
      moduleLoader.loadModules()
    },

    modulesStarted: function(modules){
      _modulesStarted(modules);
    }

    // createModules: function(){
    //   _loadModules()
    // }
  }
})()

// const main = new Main();
main.init()
main.start()
// main.createModules()
