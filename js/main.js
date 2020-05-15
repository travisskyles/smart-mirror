'use strict'

var Main = (function () {
  const modules = {
    names: [],
  }

  const loadConfig = function () {
    if (typeof config === 'undefined') {
      config = defaults
      console.log('Missing config file. Create config file to customize.')
      return
    } else {
      config = Object.assign({}, defaults, config)
      console.log('Config loaded..')

      if(!checkModuleLocations()){
        console.log('multiple modules occupying same area...')
      }else {
        console.log('module locations verified...')
      }
    }
  }

  const checkModuleLocations = function () {
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

  const loadModules = function () {
    console.log('loading modules...')

    config.modules.forEach(module => {
      modules[module.name] = { methods: window[module.name] }
      // modules[module.name].methods.init();
      modules.names.push(module.name)
    })
    setModuleInitData();
    setModuleDoms()
    console.log(modules)
  }

  const setModuleDoms = function () {
    console.log('creating module doms...')

    if (isEmpty(modules)) {
      console.log('modules not loaded...')
    }

    config.modules.forEach(module => {
      const classes = module.position.replace('_', ' ')
      const parent = document.getElementsByClassName(classes)

      if (parent.length > 0) {
        const wrapper = parent[0].getElementsByClassName('container')
        wrapper[0].classList.add(`${module.name}_module`)
      }
    })
  }

  const setModuleInitData = async function () {
    for (let i = 0; i < modules.names.length; i++) {
      let name = modules.names[i];

      try{
        let data = await modules[name].methods.getData()
        // modules[name].data = data;
        console.log('data', data)
      }
      catch(e){
        console.error(e);
      }

    }
  }

  return {
    init: function () {
      loadConfig()
      loadModules()
    },
    createModules: function () {
      modules.weather.methods.createDom()
    },
  }
})()

Main.init()
Main.createModules()
