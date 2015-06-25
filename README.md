# A [jQuery](http://jquery.com) implementation of [Miller columns](http://en.wikipedia.org/wiki/Miller_columns).

## Fully customizable
* Use any data source you prefer (HTML, AJAX, JSON, JavaScript object, XML, etc.)
* Use it with or without any CSS framework (Bootstrap, Foundation, etc.)
* Extend or replace the default event listener (e.g. keyboard navigation)
* Assign the same node to multiple nodes, it even deals with circles
* Add more functionality (e.g. search, preview, toolbar, etc.)

## Dependencies
* \>= jQuery 1.7

## Compatibility
* \>= IE 8

## How it works
To see the plugin in action, check out the [demo](http://ggergo.com/jquery-miller-columns).

#### Easy to use
1. Add a DOM element with an id attribute to the document.

```html
<div id="my-miller-column"></div>
```

2. Add jQuery and the ggergoMillerColumns plugin directly above the closing `</body>` tag.

```html
<script type="text/javascript" src="url/to/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="url/to/js/jquery.ggergoMillerColumns.js"></script>

</body>
```

3. Initialize the plugin.

```javascript
$('#my-miller-column').ggergoMillerColumns(/* { settings... } */);
```

#### Settings, defaults
| Parameter name | Default value                | Description                                 |
|:-------------- |:---------------------------- |:------------------------------------------- |
| root           | 1                            | root option id                              |
| column         | 'ul'                         | the column element tag name                 |
| option         | 'li'                         | the option element tag name                 |
| childs         | function (id) {}             | return array of child id-s                  |
| optionContent  | function (id) { return {}; } | return html content of option               |
| optionAttr     | function (id) { return {}; } | return object of option attributes          |
| columnAttr     | function (id) { return {}; } | return object of column attributes          |
| selectCallback | function (option) {...}      | callback function after selecting an option |
| onClick        | function (event) {...}       | onClick event listener                      |