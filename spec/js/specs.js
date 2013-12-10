(function() {
  describe('sponge common specs', function() {
    it('should be possible to use the sponge.common object', function() {
      return expect(sponge.common).not.toBeUndefined();
    });
    return it('should be possible to retreive the sp version and it should be equal 12 (SP 2010)', function() {
      return expect(sponge.common.spVersion).toBe("12");
    });
  });

}).call(this);

(function() {
  describe('sponge.forms specs', function() {
    var fields;
    fields = null;
    beforeEach(function() {
      loadFixtures("allFields.html");
      return fields = [sponge.forms.fields("Title"), sponge.forms.fields("Person"), sponge.forms.fields("Boolean")];
    });
    it('should be possible to retreive field object', function() {
      return runInLoop(fields, function(field) {
        return expect(field).not.toBeUndefined();
      });
    });
    it('should be possible to retrieve the field name', function() {
      return runInLoop(fields, function(field) {
        expect(field.name).not.toBeUndefined();
        return expect(field.name).not.toBe("");
      });
    });
    return it('should be possible to retrieve the field value', function() {
      return runInLoop(fields, function(field) {
        return expect(field.get()).not.toBeUndefined();
      });
    });
  });

}).call(this);

(function() {
  describe('sponge object specs', function() {
    return it('should be possible to use the sponge object', function() {
      expect(window.sponge).not.toBeUndefined();
      expect(window.sponge.forms).not.toBeUndefined();
      expect(window.sponge.field).not.toBeUndefined();
      return expect(window.sponge.common).not.toBeUndefined();
    });
  });

}).call(this);
