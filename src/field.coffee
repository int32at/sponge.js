class window.sponge.field

  _type = null
  _data = null

  constructor: (@name, data, type) ->
    _data = data
    _type = fixType(type)

  ### privates ###
  
  fixType = (type)->
    if type and type.lastIndexOf "_" != -1
      return type.substr type.lastIndexOf("_") + 1, type.length

  ### publics ###

  get: ->
    result = ""

    if _data
      switch _type
        when "upLevelDiv" then result = _data.text()
        when "BooleanField" then result = _data.attr "checked"
        else result = _data.val()

    return result.trim()

  set: (value) ->
    if value
      switch _type
        when "x" then alert "hi"

  disable: -> _data.attr "disabled", "disabled"; return undefined;
  enable: -> _data.removeAttr "disabled"; return undefined;
  show: -> _data.show(); return undefined;
  hide: -> _data.hide(); return undefined;


window.x = new window.sponge.field("myName", {}, "Some_Index")