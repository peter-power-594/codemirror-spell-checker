# CodeMirror Spell Checker
Spell checking so simple, you can set up in 60 seconds. It will highlight any misspelled words in light red. Works great in conjunction with other CodeMirror modes, like GitHub Flavored Markdown.

[Demo](http://nextstepwebs.github.io/codemirror-spell-checker/)

![Screenshot](http://i.imgur.com/7yb5Nne.png)

## Install

Via [npm](https://www.npmjs.com/package/codemirror-spell-checker).
```
npm install TristanPouliquen/codemirror-spell-checker --save
```

Via [bower](https://www.bower.io).
```
bower install git@github.com:TristanPouliquen/codemirror-spell-checker.git --save
```

```HTML
<link rel="stylesheet" href="https://github.com/TristanPouliquen/codemirror-spell-checker/blob/master/dist/spell-checker.min.css">
<script src="https://github.com/TristanPouliquen/codemirror-spell-checker/blob/master/dist/spell-checker.min.js"></script>
```

## Quick start
Once CodeMirror is installed and loaded, first provide CodeMirror Spell Checker with the correct CodeMirror function. Then, just set the primary mode to `"spell-checker"` and the backdrop mode to your desired mode. Be sure to load/require `overlay.min.js` if you haven't already.

```JS
CodeMirrorSpellChecker({
	codeMirrorInstance: CodeMirror,
});

CodeMirror.fromTextArea(document.getElementById("textarea"), {
	mode: "spell-checker",
	backdrop: "gfm" // Your desired mode
});
```

That's it!

## Other languages
In order to use another language instead of `en_US` you just have to provide an additional parameter : `language

This parameter can take various formats :
- the locale string format (eg: `fr_FR` or `es`)
- an object containing your custom dictionary links following this format :
```
{
	aff: "url of the .aff file",
	dic: "url of the .dic file"
}
```

The actually managed locales are listed in [`dictionaries.js`](/src/js/dictionaries.js). If your locale is missing, you have the corresponding `.aff` and `.dic` files with you and want them added to this library, please try and upload them to [this repository](https://github.com/titoBouzout/Dictionaries) that is listing them all, and open an issue here for me to update the `dictionaries.js` file with your locale ! :)

If your locale is not found, or you do not specify one, the English (`en` locale) dictionary will be loaded.

### Examples of usage

#### With string locale

```JS
CodeMirrorSpellChecker({
	codeMirrorInstance: CodeMirror,
	language: "en_GB",
});
```

#### With links object

```JS
CodeMirrorSpellChecker({
	codeMirrorInstance: CodeMirror,
	language: {
		aff: "https://github.com/titoBouzout/Dictionaries/blob/master/Bulgarian.aff",
		dic: "https://github.com/titoBouzout/Dictionaries/blob/master/Bulgarian.dic",
	},
});
```

## Customizing
You can customize the misspelled word appearance by updating the CSS. All misspelled words will have the `.cm-spell-error` class.

```CSS
.CodeMirror .cm-spell-error{
	/* Your styling here */
}
```
