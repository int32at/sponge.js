describe('form.js Tests', function() {

	it("Object defined", function() {
		expect(sponge.forms).not.toBeUndefined();
	});

	beforeEach(function() {
		loadFixtures('allFieldsDefaultValues.html');
	});

	describe('Simple Text Box', function() {

		var textField;

		beforeEach(function() {
			textField = sponge.forms.fields("Title");
		});

		it('should find simple text field with id = Title', function() {
			expect(textField).not.toBeUndefined();
			expect(textField.name).toBe("Title");
			expect(textField.data.length).toBe(1);
			expect(textField.type).toBe("TextField");
		});

		it('should not find simple text field without a given name', function() {

			//this will fail because NotValidTitle is not included in the fixture
			var actual = sponge.forms.fields("NotValidTitle");
			expect(actual).toBeUndefined();
		});

		it('should be possible to set the value to "TEST" and get the value again', function() {
			expect(textField.get()).toBe("MyTitle");

			var value = "Test1";
			textField.set(value);
			expect(textField.get()).toBe(value);
		});

		it('should be possible to disable the control', function() {
			textField.disable();
			expect(textField.data.attr("disabled")).toBe("disabled");
		});

		it('should be possible to hide the control', function() {
			textField.hide();
			expect(textField.row.css("display")).toBe("none");
		});

		it('should be possible to show the control', function() {
			textField.show();
			expect(textField.row.css("display")).not.toBe("none");
		});
	});

	describe('People Picker', function() {

		var peoplePicker;

		beforeEach(function() {
			peoplePicker = sponge.forms.fields("Person");
		});

		it('should find the people picker with id = Person', function() {
			expect(peoplePicker).not.toBeUndefined();
			expect(peoplePicker.name).toBe("Person");
			expect(peoplePicker.data.length).toBe(1);
			expect(peoplePicker.type).toBe("upLevelDiv");
		});

		it('should not find the people picker with id = NotValidTitle', function() {
			var actual = sponge.forms.fields("NotValidTitle");
			expect(actual).toBeUndefined();
		});

		it('should be possible to get and set the value', function() {
			var value = "DEV\\developer;".trim();
			expect(peoplePicker.get()).toBe(value);
			peoplePicker.set(value);
			
			//this will append the value to the picker (so value x2)
			//check if its been added
			expect(peoplePicker.get()).not.toBe(value);
		});

		it('should be possible to disable the control', function() {
			peoplePicker.disable();
			expect(peoplePicker.data.attr("disabled")).toBe("disabled");
		});

		it('should be possible to hide the control', function() {
			peoplePicker.hide();
			expect(peoplePicker.row.css("display")).toBe("none");
		});

		it('should be possible to show the control', function() {
			peoplePicker.show();
			expect(peoplePicker.row.css("display")).not.toBe("none");
		});
	});	

	describe('Choice - Dropdown', function() {
		var field;

		beforeEach(function() {
			field = sponge.forms.fields("ChoiceDropdown");
		});

		it('should find the control with id = ChoiceDropdown', function() {
			expect(field).not.toBeUndefined();
			expect(field.name).toBe("ChoiceDropdown");
			expect(field.data.length).toBe(1);
			expect(field.type).toBe("DropDownChoice");
		});

		it('should be possible to get and set the value of the field', function() {
			var value  = "Enter Choice #3";
			field.set(value);
			expect(field.get()).not.toBeUndefined();
			expect(field.get()).toBe(value);
		});

		it('should be possible to disable the control', function() {
			field.disable();
			expect(field.data.attr("disabled")).toBe("disabled");
		});

		it('should be possible to hide the control', function() {
			field.hide();
			expect(field.row.css("display")).toBe("none");
		});

		it('should be possible to show the control', function() {
			field.show();
			expect(field.row.css("display")).not.toBe("none");
		});
	});
});