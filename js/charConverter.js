(function(window, document) {
	'use strict';
	var textArea = document.getElementsByClassName('character-converter-textarea')[0];

	// convert the html
	document.getElementsByClassName('cc-convert')[0].addEventListener('click', function (e) {
		e.preventDefault();
		var convertedHtml;

		this.innerText = 'Converting Html...';
		textArea.setAttribute('disabled', '');

		convertedHtml = convertCharacters(textArea.value);
		textArea.value = convertedHtml;
		textArea.disabled = false;
		this.innerText = 'Convert & Copy';
		clipboard();
	});

	// copy converted text to clipboard
	function clipboard() {
		textArea.focus();
		textArea.select();

		try {
			document.execCommand('copy');
		}
		catch (err) {
			alert('Copy not supported' + err);
		}
		textArea.blur();
	}

	// populate with example text
	document.getElementsByClassName('cc-example')[0].addEventListener('click', function (e) {
		e.preventDefault();
		textArea.value = 'UTF-8 Characters: ö ü ä\nUTF-8 Chinese:  激 光 這\nHTML Entity Characters: &#28450; &#23383;';
	});

	// clear text
	document.getElementsByClassName('cc-clear')[0].addEventListener('click', function (e) {
		e.preventDefault();
		textArea.value = '';
	});

	function convertCharacters(html){
		var converted_html = '';
		var i = 0;
		while(i < html.length) {
			if (html.charCodeAt(i) > 127) {
				converted_html += '&#' + html.charCodeAt(i) + ';';
			}
			else {
				converted_html += html.charAt(i);
			}
			++i;
		}
		return converted_html;
	}
})(this, document);
