# djangor
A Django project that incorporates Grunt, Webpack, and Babel in order to execute ReactJS on the server and client side in a Windows environment.

Feel free to use this as a base template for your own projects, or to simply study and understand it.

You will need to create your React component's folders in the ./static/dev/js/**/, where the asteriks are the name of your component.

In the newly created component folder, you'll create two files:

1. client.js
2. _component.js

Your _component.js will contain your JSX/ES6 React component, setup as a module.

Your client.js will be what is eventually compiled by Webpack. In it, you'll import the component's Babel translation ("_component.babel.js"), along with React and ReactDOM. Finally, place your ReactDOM.render() script for the imported component.

Once you've completed the above, open a command prompt in administrator mode, navigate to your project's root, then simply type "grunt" and hit enter.

After the Grunt job has completed, you can type "manage.py collectstatic" for Django to move your completed files into the static root so that they can be used in your project.

Now you can simply use the file ./static/bin/js/[component_name].min.js on the client side, and the file ./static/bin/js/[component_name]/_component.babel.js can be used on the server side.

Simple!
