module.exports = function Plasma(){
  this._listeners = [];
}

module.exports.prototype.emit = function(chemical, sender){
  for(var i = 0; i<this._listeners.length; i++) {
    var listener = this._listeners[i];
    
    // prevent emitting to self
    if(sender == listener.context)
      continue;

    if(chemical.type && listener.chemicalPattern === chemical.type) {
      var chemicalNotRecieved = listener.handle.call(listener.context, chemical, sender);
      // in case plasma organelles received the chemical, further iterations are not allowed.
      if(chemicalNotRecieved !== true)
        return;
    }
  }
}

module.exports.prototype.on = function(chemicalPattern, handler, context){
  this._listeners.push({chemicalPattern: chemicalPattern, handle: handler, context: context});
}

module.exports.prototype.off = function(chemicalPattern, handler){
  for(var i = 0 ;i<this._listeners.length; i++) {
    var listener = this._listeners[i];
    if(listener.chemicalPattern == chemicalPattern && listener.handle == handler)
      this._listeners.splice(i, 1);
  }
}