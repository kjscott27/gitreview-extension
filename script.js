// GitHub loads the diffs in multiple js-diff containers (for specifically JavaScript)
// we can grab all of those containers and then go from there
var matches = document.getElementsByClassName("js-diff-progressive-container");
var totalFilesChanged = 0;
var totalFilesNotChanged = 0;
var alreadyChecked = [];
var notChecked = [];
// any matches we want to iterate over and get the children
// as the children are the individual GitHub diff elements
Array.prototype.forEach.call(matches, match => {
	// iterate through the GitHub diff elements to begin applying logic
	Array.prototype.forEach.call(match.children, child => {
		// this child has 2 children:
		// [0]: the header text and information including the Viewed text and +/- etc...
		// [1]: the actual diff text
		// in this case we only ever need index [0]
		var childHeaderInfo = child.children[0].innerText;
		var isGenerated = childHeaderInfo.includes('__generated__');
		var isSchema = childHeaderInfo.includes('schema.json');
		if (isGenerated || isSchema) {
			var checkbox = child.querySelector('.js-reviewed-checkbox');
			if (checkbox.checked) {
				alreadyChecked.push(childHeaderInfo);
				totalFilesNotChanged++;
			}
			if (!checkbox.checked) {
				notChecked.push(childHeaderInfo);
				checkbox.click();
				totalFilesChanged++;
			}
		}
	});
});
console.log('CHECKED: ', notChecked);
console.log('ALREADY CHECKED: ', alreadyChecked);
console.log('TOTAL FILES CHANGED: ', totalFilesChanged);
console.log('TOTAL FILES NOT CHANGED: ', totalFilesNotChanged);
