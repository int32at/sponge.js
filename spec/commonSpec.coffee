describe 'sponge common specs', ->
  
  it 'should be possible to use the sponge.common object', ->
    expect(sponge.common).not.toBeUndefined()

  it 'should be possible to retreive the sp version and it should be equal 12 (SP 2010)', ->
    expect(sponge.common.spVersion).toBe "12"
    