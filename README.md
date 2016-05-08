Getting Set Up
==============

If you don't have nodeJS/npm installed, a mac installer is available here:

        https://nodejs.org/download/

Then, install grunt-cli with the following command (Adding -g to the command makes this a global install, so if you've
installed grunt for another project, this part is not required):

        sudo npm install -g grunt-cli

Lastly, install the project-specific dependencies with this command:

        sudo npm install

Running Grunt
=============

Grunt does all the scss watching and template compilation for you, and has file watching to listen for file updates
for as long as the command is running.  Just use the following command:

        grunt

This will automatically run the default task, which is to compile the scss and jade templates immediately, and enable
the file watcher to update when changes are detected.

Grunt is set up to use OS X notifications, so whenever an scss or jade change is detected, you will receive a message
to let you know the compilation has either completed successfully, or if there is an issue.