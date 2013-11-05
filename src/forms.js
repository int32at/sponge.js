(function () {
	sponge = window.sponge || {};

	sponge.forms = function() {
		var self = this;

		var findField = function(name) {
			var type = undefined;

			var f = $("input[Title='" + name + "']");

			if (f.length === 0) {
                f = $("Select[Title='" + name + "']");
            }

            //multi dropdown
            if (f.length === 0) {
                f = $("Select[Title='" + name + " selected values']");
            }

            //people picker
            if (f.length === 0) {
                var row = $("nobr:contains('" + name + "')").closest("tr");
                f = row.find("div[name='upLevelDiv']");
            }

            //multi checkboxes
            if (f.length === 0) {
                var row = $("nobr:contains('" + name + "')").closest("tr");
                f = row.find("span .ms-RadioText");
            }

            //multiline textbox
            if (f.length === 0) {
                var row = $("nobr:contains('" + name + "')").closest("tr");
                f = row.find("div[role=textbox]");
            }

			if(f.length === 0) {
				return undefined;
			}

			return new field(f, name, type);
		};

		function field(data, name, type) {
			var self = this;
			self.data = data;
			self.name = name;
			self.type = function(type) {

				if(type !== undefined)
					return type;

				var id = self.data.attr("id");

                if (typeof id === "undefined")
                	return self.type;

                return id.substr(id.lastIndexOf("_") + 1, id.length);
			}();

			var get = function() {
				return self.data.val();
			};

			var set = function(value) {
				self.data.val(value);
			};

			var disable = function() {
				self.data.attr("disabled", "disabled");
			};

			return {
				name : self.name,
				data : self.data,
				type : self.type,
				get : get,
				set : set,
				disable : disable
			};
		}

		return {
			fields : function(name) {
				return findField(name);
			}
		};
	}();
}());

