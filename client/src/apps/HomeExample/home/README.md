# Subsection

Subsections are top-level (or nested) directories containing only 

* templates (.html, .css)
* controllers
* module definitions

We stamp out sub-level child sub-sections using the same unit template (i.e., a section is made up of templates, controllers, and module definitions), going deeper and deeper as needed to reflect the inheritance of elements in the UI.

For a very simple app, with just one controller, sub-section directories might not be needed, since everything is defined in the top-level files.

Sub-sections may or may not have their own modules, depending on how complex the code is.
