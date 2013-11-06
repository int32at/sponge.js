(function () {
	sponge = window.sponge || {};

	sponge.common = function() {
		return {
			init: function() {
				
			}
		};
	}();
}());



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
                type = "MultiCheckBox";
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
			self.type = function() {

				if(type !== undefined)
					return type;

				var id = self.data.attr("id");

                if (typeof id === "undefined")
                	return self.type;

                return id.substr(id.lastIndexOf("_") + 1, id.length);
			}();

			var rowData = function() {
				var row;

                switch (self.type) {
                    case "DateTimeFieldDate":
                        //wtf right?
                        row = self.data.closest("tr").parent().parent().parent().parent().parent();
                        break;

                    case "upLevelDiv":
                        //love those nested sharepoint controls...
                        row = self.data.closest("tr").parent().parent().parent().parent().parent().parent().parent().parent().parent().parent();
                        break;

                    case "SelectResult":
                        row = self.data.closest("tr").parent().parent().parent().parent().parent();
                        break;

                    case "MultiCheckBox":
                        row = self.data.closest("tr").parent().parent().parent().parent().parent();
                        break;

                    default:
                        row = self.data.closest("tr");
                }

                    return row;
			};

			self.row = rowData();

			var get = function() {
				var value;

                switch (self.type) {
                    case "Lookup":
                        var option = $("option:selected", self.data);
                        value = { id: option.val(), text: option.text() };
                        break;

                    case "SelectResult":
                        var options = new Array();
                        $("option", self.data).each(function (i, o) {
                            o = $(o);

                            options.push({ id: o.val(), text: o.text() });
                        });
                        value = options;
                        break;

                    case "BooleanField":
                        value = self.data.attr("checked"); 
                        break;

                    case "DateTimeFieldDate":
                        value = new Date(self.data.val());
                        break;

                    case "upLevelDiv":
                        value = self.data.text();
                        break;

                    case "MultiCheckBox":
                        var options = new Array();
                        $(self.data).each(function (i, o) {
                            o = $(o);
                            var checked = typeof $("input", o).attr("checked") !== "undefined";

                            options.push({ checked: checked, text: o.text() });
                        });
                        value = options;
                        break;

                    case "inplacerte":
                        value = self.data.html();
                        break;

                    default:
                        value = self.data.val();
                }

                return value;
			};

			var set = function(value) {
				switch (self.type) {
                    case "BooleanField":
                        self.data.val(value);
                        self.data.attr("checked", value);
                        break;

                    case "upLevelDiv":
                        self.data.append(value);
                        var check = self.row.find("img[Title='Check Names']:first");

                        if(check.length === 1) {
							try {
								check.click();
							} catch(err) {}
                        }
                        break;

                    case "SelectResult":
                        var options = self.row.find("select[title='" + self.name + " possible values'] option:contains('" + value + "')");

                        options.each(function (i, o) {
                            self.data.append(o);
                        });
                        break;

                    case "MultiCheckBox":
                        self.data.each(function (i, o) {

                            if (o.title == value) {
                                var checkbox = $("input", o);
                                var checked = typeof $("input", o).attr("checked") !== "undefined";
                                checkbox.attr("checked", !checked);
                            }
                        });
                        break;

                    case "inplacerte": //multi line tb
                        self.data.html("");
                        self.data.html(value);
                        break;

                    default:
                        self.data.val(value);
                }
			};

			var disable = function() {
				self.data.attr("disabled", "disabled");
			};

			var hide = function() {
				self.row.hide();
			};

			var show = function() {
				self.row.show();
			};

			return {
				name : self.name,
				data : self.data,
				type : self.type,
				row : self.row,
				get : get,
				set : set,
				disable : disable,
				hide : hide,
				show : show
			};
		}

		return {
			fields : function(name) {
				return findField(name);
			}
		};
	}();
}());

