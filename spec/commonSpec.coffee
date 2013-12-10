describe 'sponge common specs', ->
  
  it 'should be possible to use the sponge.common object', ->
    expect(sponge.common).not.toBeUndefined()

  it 'should be possible to retreive the sp version (12 if SP namespace does not exist)', ->
    expect(sponge.common.spVersion).toBe "12"
    