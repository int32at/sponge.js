describe('form.js Tests', function() {
	
	it("Object defined", function() {
		expect(sponge.forms).not.toBeUndefined();
	});

	it("Find Field", function() {
		loadFixtures('simpleTextField.html');

		var actual = $("#field");

		expect(actual.length).toBe(1);
	});

});