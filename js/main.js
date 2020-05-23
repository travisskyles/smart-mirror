'use strict'

class Main{
  constructor(){
    this.modules = {
      names: [],
    }
  }
  // modules = {
  //   names: [],
  // }

  _loadConfig(){
    if (typeof config === 'undefined') {
      config = defaults
      console.log('Missing config file. Create config file to customize.')
      return
    } else {
      config = Object.assign({}, defaults, config)
      console.log('Config loaded..')

      if(!this._checkModuleLocations()){
        console.log('multiple modules occupying same area...')
      }else {
        console.log('module locations verified...')
      }
    }
  }

  _checkModuleLocations(){
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

  _loadModules(){
    console.log('loading modules...')

    config.modules.forEach(module => {
      this.modules[module.name] = { methods: window[module.name] }
      // modules[module.name].methods.init();
      this.modules.names.push(module.name)
    })
    this._setModuleInitData();
    this._setModuleDoms()
    console.log(this.modules)
  }

  _setModuleDoms(){
    console.log('creating module doms...')

    if (isEmpty(this.modules)) {
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

  async _setModuleInitData(){
    for (let i = 0; i < this.modules.names.length; i++) {
      let name = this.modules.names[i];

      try{
        let data = await this.modules[name].methods.getData()
        this.modules[name].data = data;
        console.log('data', this.modules)
        this._insertModuleData();
      }
      catch(e){
        console.error(e);
      }

    }
  }

  _insertModuleData(){
    console.log(this.modules.weather.data)
    this.modules.weather.methods.createDom(this.modules.weather.data)
  }


  init(){
    this._loadConfig()
  }

  createModules(){
    this._loadModules()
  }
}

const main = new Main();
main.init()
main.createModules()
