 //the snippets we hardcoded to populate our DB

 const snippets = {
 html: [
 [
 `<div> <h4> My Content Heading </h4> <p> My content text </p> </div>`,
 'Creates a div with a h4 header and a paragraph'
 ],
 [
 `<a href="#"><img itemprop="image" style="height: 90px;"
 src="http://www.chatbot.chat/assets/images/header-bg_y.jpg"
 alt="picture">  </a>`,
 'An image that has a link anchored to it'
 ], 
 [`<!DOCTYPE HTML>
 <html lang = "en">
 <head>
 <title>basic html</title>
 <meta charset = "UTF-8" />
 </head>
 <body>
 <h1>Level One Headline</h1>
 <p>
 This is a paragraph.
 Note that the text is automatically wrapped.
 </p>
 </body>
 </html>`,
 `Basic starting layout for an HTML file`
 ]
 ],
 sql: [
 [
 `SELECT column_name(s) FROM table1 INNER JOIN table2 ON table1.column_name = table2.column_name;`,
 `The INNER JOIN keyword selects records that have matching values in both tables.`
 ],
 [
 `SELECT * FROM table WHERE id = '3'`,
 `Returns all columns from rows where the id is 3`
 ], 
 [
 'INSERT INTO table (col1, col2, col3, col4) VALUES ($1, $2, $3, $4) RETURNING *',
 `Creates a new entry into selected table with values of the columns determined by the $ variables and then returns what was created`
 ]
 ],
 javascript: [
 [
 `const balancedParens = (input) => {
 const matches = {
 '[': ']',
 '{': '}',
 '(': ')',
 };
 const stack = [];
 for (let i = 0; i < input.length; i++) {
 const char = input[i];
 if (matches[char]) {
 stack.push(char);
 } else if (char === ')' || char === '}' || char === ']') {
 if (matches[stack.pop()] !== char) {
 return false;
 }
 }
 }
 return !stack.length;
 };`,
 `Checks if a given string has valid parentheses.
 For example: '([{}()])' will yield true, while '(}{)' will yield false`
 ],
 [
 `switch(arg) {
 case "hello": {
 console.log("hello")
 break
 }
 case "goodbye": {
 console.log("goodbye")
 break
 }
 default:
 console.log("Not a good case")
 }`,
 "Example of switch case syntax, this compares the arg against the string values and if they strictly match then it will execute that case, if it doesn't match anything, it will go to the default case"
 ],
 [
 'var now = new Date(); var dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6' +
 ' if(dayOfWeek == 5) { '+
 'document.write("Have a nice weekend!"); '+
 '} else if(dayOfWeek == 0) { '+
 'document.write("Have a nice Sunday!"); '+
 '} else { '+
 'document.write("Have a nice day!"); '+
 '}',
 'Multi if else statement for all the days of the week'
 ] 
 ],
 react: [
 [
 `componentDidMount() {
 fetch(/endpoint)
 .then(res=> res.json())
 .then(json => setState({stateAttribute: json}))
 }`,
 `Sends a fetch request to specified endpoint when the component is mounted to the webpage, 
 it then converts the response from json and sets a state attribute to that given value`
 ],
 [
 `const element = <h1> Hello, world </h1>;
 ReactDOM.render(element, document.getElementById('root'));`,
 'Renders an element to the DOM'
 ],
 ],
 express: [
 [
 `const express = require('express');
 const path = require('path');
 const cookieparser = require('cookie-parser')
 const app = express();`,
 `Imports the necessary npm libraries and creates an instance of express to set up a server`
 ],
 [
 `sessionController.verify = (req, res, next) => {
 jwt.verify(req.cookies.ssid, secret, (err, result) => {
 if(err) {
 res.status(404).send('Couldn't verify jwt');
 } else {
 res.locals.verifiedjwt = result;
 return next();
 }
 })
 }`,
 `Middleware that verifies a jwt before serving the webpage`
 ],
 [
 `var express = require('express');
 var app = express();
 app.get('/', function (req, res) {
 res.send('<html><body><h1>Hello World</h1></body></html>');
 });
 app.post('/submit-data', function (req, res) {
 res.send('POST Request');
 });
 app.put('/update-data', function (req, res) {
 res.send('PUT Request');
 });
 app.delete('/delete-data', function (req, res) {
 res.send('DELETE Request');
 });
 var server = app.listen(5000, function () {
 console.log('Node server is running..');
 });`,
 'Configures routes for express.js web application framework'
 ]],
 };

 export default snippets;