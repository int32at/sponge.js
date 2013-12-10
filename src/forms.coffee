window.sponge.forms = {};

window.sponge.forms =
(->
  checkFields = (fields) ->
    for selector in fields.selectors
      field = $ selector.select

      if field.length > 1
        field = selector.action(field, fields.name)

      if field.length == 1
        return field


  fields: (name) ->
    fields =  {
                name: name,
                selectors:
                  [ 
                    #normal text
                    { select: "input[Title='" + name + "']", action: -> console.log(1) },
                    
                    #people picker
                    { select: "nobr", action: (nobr, name) -> return (nobr.filter -> $(this).contents().eq(0).text() == name)
                    .closest("tr")
                    .find("div[name='upLevelDiv']") }
                  ]
              }

    data = checkFields fields
    
    if data
      type = data.attr "id"
      return new sponge.field name, data, type
)()