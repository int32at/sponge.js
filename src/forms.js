(function () {
	sponge = window.sponge || {};

	sponge.forms = function() {
		var self = this;

		var findField = function(name) {
			return { "field" : "test" };
		};

		var findAllFields = function() {

		};

		return {
			field : function(name) {
				return findField(name);
			},

			fields : function() {
				return findAllFields();
			}
		};
	}();
}());

