describe('form.js Tests', function() {

	var fields = [];

	beforeEach(function() {
		loadFixtures('allFieldsDefaultValues.html');
		fields.push(sponge.forms.fields("Title"));
		fields.push(sponge.forms.fields("Person"));
		fields.push(sponge.forms.fields("ChoiceDropdown"));
		fields.push(sponge.forms.fields("ChoiceRadio"));
		fields.push(sponge.forms.fields("ChoiceMulti"));
		fields.push(sponge.forms.fields("Number"));
		fields.push(sponge.forms.fields("Currency"));
		fields.push(sponge.forms.fields("Boolean"));
		fields.push(sponge.forms.fields("Date"));
		fields.push(sponge.forms.fields("HyperLink"));
		fields.push(sponge.forms.fields("Lookup"));
		fields.push(sponge.forms.fields("Multi"));
		fields.push(sponge.forms.fields("MultiLookup"));
	});

	it('should define all fields', function() {
		runInLoop(function(field) {
			expect(field).toBeDefined();
			expect(field.name).toBeDefined();
			expect(field.data.length).not.toBe(0);
		});
	});

	it('should be possible to hide the field', function() {
		runInLoop(function(field) {
			field.hide();
			expect(field.row.css("display")).toBe("none");
		});
	});

	it('should be possible to show the field', function() {
		runInLoop(function(field) {
			field.show();
			expect(field.row.css("display")).not.toBe("none");
		});
	});

	it('should be possible to enable the filed', function() {
		runInLoop(function(field) {
			field.enable();
			expect(field.data.attr("disabled")).toBeUndefined();
		});
	});

	it('should be possible to disable the field', function() {
		runInLoop(function(field) {
			field.disable();
			expect(field.data.attr("disabled")).toBe("disabled");
		});
	});	

	it('should be possible to get the value of the field', function() {
		runInLoop(function(field) {
			var value = field.get();
			expect(value).toBeDefined();
		});
	});

	it('should be possible to set the value of the field', function() {
		runInLoop(function(field) {
			field.set("Enter Choice #1");

			var value = field.get();
			expect(value).not.toBeUndefined();
		});
	});

	function runInLoop(callback) {
		for (var i = fields.length - 1; i >= 0; i--) {
			var field = fields[i];
			callback.apply(null, [field]);
		}
	}
});