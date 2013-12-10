describe 'sponge object specs', ->
  
  it 'should be possible to use the sponge object', ->
    expect(window.sponge).not.toBeUndefined()
    expect(window.sponge.forms).not.toBeUndefined()
    expect(window.sponge.field).not.toBeUndefined()
    expect(window.sponge.common).not.toBeUndefined()