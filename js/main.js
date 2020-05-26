'use strict'

const main = (function(){
    const modules = {names: []};



  function _loadConfig(){
    if (typeof config === 'undefined') {
      config = defaults
      console.log('Missing config file. Reverting to default settings. Create config file to customize.')
      return
    } else {
      config = Object.assign({}, defaults, config)
      console.log('Config loaded..')

      if(!_checkModuleLocations()){
        console.log('multiple modules occupying same area...')
      }else {
        console.log('module locations verified...')
      }
    }
  }

  function _checkModuleLocations(){
    let positions = {}
    for (let i = 0; i < config.modules.length; i++) {
      if (positions[i.position]) {
        positions[i.position] = 1
      } else {
        return false
      }
    }
    return true
  }

  function _loadModules(){
    console.log('loading modules...')

    config.modules.forEach(module => {
      modules[module.name] = { methods: window[module.name] }
      // modules[module.name].methods.init();
      modules.names.push(module.name)
    })
    _setModuleInitData();
    _setModuleDoms()
    console.log(modules)
  }

  function _setModuleDoms(){
    console.log('creating module doms...')

    if (isEmpty(modules)) {
      console.log('modules not loaded...')
    }

    config.modules.forEach(module => {
      const classes = module.position.replace('_', ' ')
      const parent = document.getElementsByClassName(classes)

      if(parent.length > 0) {
        const wrapper = parent[0].getElementsByClassName('container')
        wrapper[0].classList.add(`${module.name}_module`)
      }
    })
  }

  async function _setModuleInitData(){
    for (let i = 0; i < modules.names.length; i++) {
      let name = modules.names[i];

      try{
        let data = await modules[name].methods.getData()
        modules[name].data = data;
        console.log('data', modules)
        _insertModuleData();
      }
      catch(e){
        console.error(e);
      }

    }
  }

  function _insertModuleData(){
    console.log(modules.weather.data)
    modules.weather.methods.createDom(modules.weather.data)
  }

  return{
    init: function(){
      _loadConfig()
    },

    createModules: function(){
      _loadModules()
    }
  }
})()

// const main = new Main();
main.init()
main.createModules()
