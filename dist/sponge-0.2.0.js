(function() {
  window.sponge = {};

  window.sponge = (function() {
    return {
      version: "0.2.0"
    };
  })();

}).call(this);

(function() {
  window.sponge.common = {};

  window.sponge.common = (function() {
    return {
      spVersion: typeof SP !== "undefined" && SP !== null ? parseInt(SP.ClientSchemaVersions.currentVersion) : "12"
    };
  })();

}).call(this);

(function() {
  window.sponge.field = (function() {
    var fixType, _data, _type;

    _type = null;

    _data = null;

    function field(name, data, type) {
      this.name = name;
      _data = data;
      _type = fixType(type);
    }

    /* privates*/


    fixType = function(type) {
      if (type && type.lastIndexOf("_" !== -1)) {
        return type.substr(type.lastIndexOf("_") + 1, type.length);
      }
    };

    /* publics*/


    field.prototype.get = function() {
      var result;
      result = "";
      if (_data) {
        switch (_type) {
          case "upLevelDiv":
            result = _data.text();
            break;
          case "BooleanField":
            result = _data.attr("checked");
            break;
          default:
            result = _data.val();
        }
      }
      return result.trim();
    };

    field.prototype.set = function(value) {
      if (value) {
        switch (_type) {
          case "x":
            return alert("hi");
        }
      }
    };

    field.prototype.disable = function() {
      _data.attr("disabled", "disabled");
      return void 0;
    };

    field.prototype.enable = function() {
      _data.removeAttr("disabled");
      return void 0;
    };

    field.prototype.show = function() {
      _data.show();
      return void 0;
    };

    field.prototype.hide = function() {
      _data.hide();
      return void 0;
    };

    return field;

  })();

  window.x = new window.sponge.field("myName", {}, "Some_Index");

}).call(this);

(function() {
  window.sponge.forms = {};

  window.sponge.forms = (function() {
    var checkFields;
    checkFields = function(fields) {
      var field, selector, _i, _len, _ref;
      _ref = fields.selectors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        selector = _ref[_i];
        field = $(selector.select);
        if (field.length > 1) {
          field = selector.action(field, fields.name);
        }
        if (field.length === 1) {
          return field;
        }
      }
    };
    return {
      fields: function(name) {
        var data, fields, type;
        fields = {
          name: name,
          selectors: [
            {
              select: "input[Title='" + name + "']",
              action: function() {
                return console.log(1);
              }
            }, {
              select: "nobr",
              action: function(nobr, name) {
                return (nobr.filter(function() {
                  return $(this).contents().eq(0).text() === name;
                })).closest("tr").find("div[name='upLevelDiv']");
              }
            }
          ]
        };
        data = checkFields(fields);
        if (data) {
          type = data.attr("id");
          return new sponge.field(name, data, type);
        }
      }
    };
  })();

}).call(this);
