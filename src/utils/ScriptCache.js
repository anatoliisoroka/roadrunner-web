// Inspiration from: https://www.fullstackreact.com/articles/Declaratively_loading_JS_libraries/index.html
// ================================================================================
// Summary: a handy class for dynamically loading and using async JS libs in a ReactJS app
// ================================================================================
//
// Usage:
// 1. create a `ScriptCache` instance:
//      const scriptCache = new ScriptCache(["http://remote.cdn.com/myLibrary.min.js", "http://..."]);
// 2. pass any functions that depend on window globals (from your script) into `scriptCache.onLoad`
// ================================================================================

export default class ScriptCache {
  static LOADED_JS = false

  static SCRIPT_STATUS = {
    COMPLETE: 'complete',
    ERROR: 'error'
  }

  static DEFAULT_INTERNAL_SCRIPT_FILE_NAMES = [
    'jquery-3.1.1.min.js',
    'flickity.min.js',
    'easypiechart.min.js',
    'parallax.js',
    'typed.min.js',
    'datepicker.js',
    'isotope.min.js',
    'ytplayer.min.js',
    'lightbox.min.js',
    'granim.min.js',
    'jquery.steps.min.js',
    'countdown.min.js',
    'twitterfetcher.min.js',
    'spectragram.min.js',
    'smooth-scroll.min.js',
    'scripts.js'
  ]

  constructor(scripts) {
    this.loaded = []
    this.failed = []
    this.pending = []

    this.load(scripts)
  }

  /**
   * Use this block to run any additional setup
   * when the scripts have loaded (or failed)
   */
  onLoad(onSuccess, onReject) {
    if (onReject) onReject(this.failed)
    if (onSuccess) onSuccess(this.loaded)
  }

  /**
   * This will loop through and load any scripts
   * passed into the class constructor
   */
  load(scripts = []) {
    if (!scripts.length) return
    const scriptPromises = []
    for (let script of scripts) {
      scriptPromises.push(this.loadScript(script))
    }

    return Promise.all(scriptPromises)
  }

  /**
   * This loads a single script from its source.
   * The 'loading' action is wrapped in a promise,
   * which should fail if the script cannot be fetched
   */
  loadScript(script) {
    if (this.loaded.indexOf(script) > -1) return Promise.resolve(script)
    this.pending.push(script)
    return this.createScriptTag(script)
      .then(script => {
        this.loaded.push(script)
        this.pending.splice(this.pending.indexOf(script), 1)
        return script
      })
      .catch(e => {
        this.failed.push(script)
        this.pending.splice(this.pending.indexOf(script), 1)
      })
  }

  /**
   * This creates a <script> tag and appends it to the document body */
  createScriptTag = (scriptSrc, onComplete) =>
    new Promise((resolve, reject) => {
      let resolved = false,
        errored = false,
        body = document.body,
        tag = document.createElement('script')

      const handleLoad = event => {
        resolved = true
        resolve(scriptSrc)
      }
      const handleReject = event => {
        errored = true
        reject(scriptSrc)
      }
      const handleComplete = () => {
        if (resolved) return handleLoad()
        if (errored) return handleReject()

        const status = ScriptCache.SCRIPT_STATUS
        const state = tag.readyState
        if (state === status.COMPLETE) handleLoad()
        else if (state === status.ERROR) handleReject()
      }

      tag.type = 'text/javascript'
      tag.async = false
      // Replace 'onComplete' callback reference in some script tag urls (e.g. Google Maps V3)
      if (scriptSrc.match(/callback=CALLBACK_NAME/)) {
        const onCompleteName = 'onScriptSrcLoaded'
        scriptSrc = scriptSrc.replace(/(callback=)[^&]+/, `$1${onCompleteName}`)
        window[onCompleteName] = handleLoad
      } else tag.addEventListener('load', handleLoad)

      tag.addEventListener('error', handleReject)
      tag.onreadystatechange = handleComplete
      tag.src = scriptSrc
      body.appendChild(tag)

      return tag
    })

  static loadDefaults() {
    if (ScriptCache.LOADED_JS) {
      return
    }

    ScriptCache.LOADED_JS = true

    var scripts = []
    for (
      var i = 0;
      i < ScriptCache.DEFAULT_INTERNAL_SCRIPT_FILE_NAMES.length;
      i++
    ) {
      var scriptFileName = ScriptCache.DEFAULT_INTERNAL_SCRIPT_FILE_NAMES[i]
      var fullPath = process.env.PUBLIC_URL + '/assets/js/' + scriptFileName
      scripts.push(fullPath)
    }

    return new ScriptCache(scripts).onLoad(() => {
      // content loaded
    })
  }
}
