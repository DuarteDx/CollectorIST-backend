function NoAuthorException (message) {
  this.message = message
  this.name = 'NoAuthorException'
}

function NoBibtexException (message) {
  this.message = message
  this.name = 'NoBibtexException'
}

function NoDateException (message) {
  this.message = message
  this.name = 'NoDateException'
}

function NoAdapterTypeException (name, message) {
  this.message = message
  this.name = 'NoAdapterTypeException'
  this.adapterName = name
}

export {
  NoAuthorException,
  NoBibtexException,
  NoAdapterTypeException,
  NoDateException
}
