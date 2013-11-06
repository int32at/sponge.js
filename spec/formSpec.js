describe('form.js Tests', function() {

	it("Object defined", function() {
		expect(sponge.forms).not.toBeUndefined();
	});

	beforeEach(function() {
		loadFixtures('allFields.html');
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

		it('should add the disabled attribute when the disabled() method is called', function() {

			textField.disable();
			var disabled = textField.data.attr("disabled");
			expect(disabled).toBe("disabled");
		});

		it('should be possible to set the value to "TEST" and get the value again', function() {
			var value = "TEST";
			textField.set(value);
			expect(textField.get()).toBe(value);
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
			var value = "TEST";
			peoplePicker.set(value);
			expect(peoplePicker.get()).toBe(value);
		});
	});	
});