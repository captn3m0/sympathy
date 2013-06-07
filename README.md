SourceKit
=========
A Textmate like lightweight programmer's text editor right inside of Chrome. It saves files directly to Dropbox, so if you have the Dropbox sync software installed, the changes will appear locally as if you did so with a text editor! Changes will be stored remotely so naturally this same extension will pull up the same copy of the file everywhere!

Resources
---------
Report issues here: https://github.com/kenotron/sourcekit/issues
Follow me: http://twitter.com/kenneth_chau

Details
-------
Embedded is the excellent Ajax.org's Ace text editor component. This allows for a very natural text editing experience while retaining Chrome's amazing JavaScript performance.

Installation
------------
* Go to the Google Web Store, search for 'SourceKit' - install it!
* -OR- Clone the repository and then install as an 'unpacked extension' inside Chrome

Contributors
------------
* antimatter15: https://github.com/antimatter15
* csnodgrass: https://github.com/colesnodgrass
* mrpants: https://github.com/mrpants

Changelog
---------
### 0.7.3 ###
* Fixed the url to Dropbox's API calls.

### 0.7.2 ###
* Fixed a rendering bug with the options dialog

### 0.7.1 ###
* Fixed version numbering

### 0.7.0 ###
* colesnodgrass added Options (saving to localStorage)!!!!!
* kenotron updated icon text to be consistently white (it's so subtle, you probably didn't notice it...)

### 0.6.6 ###
* Added several themes: THANKS to mrpants!!!
* Added .pm syntax highlight for Perl module files (duh!)
* New icons :) Hope you like it!!

### 0.6.5 ###
* Added Word Wrap selection
* Added Theme selection

### 0.6.4 ###
* Replaced direct calls to dropbox.js with Dojo data api (can you guess where I'm headed?!)
* Added Perl, CoffeeScript, and C# highlighter support
* Updated RequireJS to v2.3 (since Ace supports it now!)

### 0.6.3 ###
* Fixed the file mode mapping file (more file types and added html & js); THANKS to antimatter15!!! 

### 0.6.2 ###
* Added auto syntax hightlighting

### 0.6.1 ###
* HOLY MOTHER OF REWRITE!
* Now uses Dojo, Ace
* Authenticates via more user friendly Dropbox OAuth API
* Got rid of the Dropbox email / password screen
* Added capability to create new files and folders and delete files (right click does it!)

Older Changelog (not relevant anymore!)
---------------------------------------
### 0.5.0 (never released) ###
* Added PLUGINs support
* Fixed a file name compatibility issue in the file list
* Never released...

### 0.4.1 ###
* C#, SQL support
* Do not prevent editing text/* mime types (shell, CSS, and others are allowed)

### 0.4.0 ###
* By popular demand, this has been converted to a packaged app!

### 0.3.8 ###
* Utilize Bespin's buffers when switching tabs
* Fixes undo / redo functionality (so the undo history is not mixed between tabs!!!)
* Added a "lock" so one cannot click on multiple files while the first file is being loaded
* Much better looking "Options" page

### 0.3.7 ###
* Fixed a bug about opening files with spaces in them
* Can create files / folders with the file list on the left
* Added default page so the app is less "bare" when started

### 0.3.6 ###
* BUG FIX... had a typo in the last release

### 0.3.5 ###
* Tabbed interface!
* Added support for C#, and CoffeeScript

### 0.3.4 ###
* Added a syntax highlighting support for many different languages including: C/C++, Ruby, Python, PHP, HTML, JavaScript, Java
* The file list is sorted now (on open)

### 0.3.3 ###
* Applied to Dropbox for production application status! (pending approval!!!)
* Renamed to SourceKit
* too many ChromePad's and too Chrome specific

### 0.3.1 ###
* First public release!