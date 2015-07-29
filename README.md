angular-chosen
==============

AngularJS Chosen directive

This directive brings the [Chosen](http://harvesthq.github.com/chosen/) jQuery plugin
into AngularJS with ngModel and ngOptions integration.

To use, include "angular-chosen" as a dependency in your Angular module.  You can now
use the "chosen" directive as an attribute on any select element.  Angular version 1.2+ is required.

# Installation

    $ bower install angular-chosen-jeserkin --save

# Features
  * Works with `ngModel` and `ngOptions`
  * Pass options to `Chosen` by passing an object to the Chosen directive

# Usage

### Simple example
Similar to `$("#states").chosen()`

```html
<select chosen multiple id="states">
  <option value="AK">Alaska</option>
  <option value="AZ">Arizona</option>
  <option value="AR">Arkansas</option>
  <option value="CA">California</option>
</select>
```

### Pass any chosen options via chosen directive

```html
<select chosen="{disable-search: true, allow-single-deselect: true}"
        data-placeholder="Pick one of these">
  <option value=""></option>
  <option>This is fun</option>
  <option>I like Chosen so much</option>
  <option>I also like bunny rabbits</option>
</select>
```
Note: the empty option element is mandatory when using `allow-single-deselect`

### Integration with `ngModel` and `ngOptions`

```html
<select multiple
        chosen
        ng-model="state"
        ng-options="s for s in states">
</select>
```

Note: don't try to use `ngModel` with `ngRepeat`.  It won't work.  Use `ngOptions`.  It's better that way.

Also important: if your `ngModel` is null or undefined, you must manually include an empty option inside your `<select>`, otherwise you'll encounter strange off-by-one errors:

```html
<select multiple
        chosen
        ng-model="state"
        ng-options="s for s in states">
  <option value=""></option>
</select>
```

This annoying behavior is alluded to in the examples in the [documentation for ngOptions](http://docs.angularjs.org/api/ng.directive:select).

#### Works well with other AngularJS directives

```html
<select chosen
        ng-model="state"
        ng-options="s for s in states"
        ng-disabled="editable">
</select>
```

Note: Most part of the logic is taken from [angular-chosen-localytics](https://github.com/localytics/angular-chosen)