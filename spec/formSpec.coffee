describe 'sponge.forms specs', ->
  fields = null

  beforeEach ->
    loadFixtures "allFields.html"
    fields =  [ 
                sponge.forms.fields("Title")
                sponge.forms.fields("Person")
                sponge.forms.fields("Boolean")
              ]

  it 'should be possible to retreive field object', ->
    runInLoop fields, (field) ->
      expect(field).not.toBeUndefined()

  it 'should be possible to retrieve the field name', ->
    runInLoop fields, (field) ->
      expect(field.name).not.toBeUndefined()
      expect(field.name).not.toBe ""

  it 'should be possible to retrieve the field value', ->
    runInLoop fields, (field) ->
      expect(field.get()).not.toBeUndefined()
    
    