# Angular1-part3-Controllers

In the last lesson, we talked about using `ng-model` inside the DOM and how, even if there is no declared scope variable of the same name inside the controller, it will create one on the memory image when it is run. In this lesson, we're going to talk about controllers a little bit and a couple of commonly used services that Angular provides us out of the box. By doing this, we're going to inadvertently introduce how to use dependency injection to extend the functionality of controllers.

Let's say that one of our friends that really...really likes Star Wars and wants to be able to search for any character in a search bar and get the results. Seems like something they could search Google for fairly easily, but hey, who are we to judge. The question then becomes, how do we make an API call? Well, Angular has this cool built-in service called `$http`, which gives us the ability to make API calls and do things with the results.

Let's start by opening up our `app.js` file and taking a look at the controller. In the last lesson, we talked briefly about how we can inject dependencies into the arguments of the controller's callback function. So, let's add `$http` as a dependency there. Now that we've done that, let's write a little function that will allow us to get the value from the input element inside the DOM and use that value to search the API. 

Remember that when you declare something inside the controller with scope, you can access it inside the DOM. This includes functions, so let's do that. Let's write a function called `$scope.makeAPIcall` and give it a parameter of `character`. Inside this function, we're going to use a shortcut `$http` method (`$http.get`) to send a get request to the [Star Wars API](https://swapi.co) and see if we can find the charater our friend is looking for. The `$http.get` method only needs one argument, which is the url that we want to request. Luckily for us, also, SWAPI lets us search using a query at the end of the url so we can search using what the user put into the input box. I'm going to assume that you have a basic understanding of Javascript if you've gotten this far without your head exploding, so I'm going to assume that you know about string concatenation, url queries, async methods (then(), success(), error(), etc.), and how to use the browser console. Basically, we're going to get the input from the input element in the html and concatentate that on to the end of the url string after `?search=`, then use a `.then()` method to get the value back asynchronously. Once that comes back, we use the function inside the `.then()` method to tell Angular what to do with it. We could log it to the browser console, but really, we could just as easily use the html itself. To get it to show out on the DOM, let's assign the response to a scope variable called `$scope.result` and see what that gives us on the page.

Here's what `app.js` should look like now:

<pre><code>var app = angular.module('myFirstNgApp', []);

app.controller('myFirstController', function($scope, $http) {
  $scope.makeAPIcall = function(character) {
    $http.get('https://swapi.co/api/people/?search=' + character)
         .then(function(api_response) {
           $scope.result = api_response;
         });
  }
});
</code></pre>

Let's go back to `index.html`. Okay, so let's change the name of the `ng-model` to character and add a button below it. The only attribute you need in there is a new one called `ng-click`. This aptly named attribute watches for this button to be clicked and then within the double quotes, you put in the function that you would like to call. The beautiful part about it, too, is that you can just put `character` as an argument and it will assume that it is a scope variable of that name, which we have declared in the ng-model in the input element above it. So, let's add `ng-click="makeAPIcall(character)"` to the button element. Now that we have that there, whenever we cick that button, it takes the value of the scope variable `character` and calls the `makeAPIcall` function with `character` as an argument inside the controller. If we go back and look at the controller, we see that we take that value of `character` and concatenate it to the end of the get request to SWAPI to search for whatever the user was looking for. Once it gets a response back,
it will move on to the `.then()` method and pass that api response to the callback function. From there, we take the response and assign it to `$scope.result`, which should make it visible on the DOM. WHEW! That's a lot. Let's make it visible on the DOM, though. Below the button let's just create an empty div and toss in our `{{result}}` to see what we get.

```text
<!DOCTYPE html>
<html ng-app="myFirstNgApp">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body ng-controller="myFirstController">

    <input type="text" ng-model="character">
    <button ng-click="makeAPIcall(character)">Search</button>

    <div class="">
      {{result}}
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js" charset="utf-8"></script>
    <script src="app.js" charset="utf-8"></script>
  </body>
</html>
```
Now let's save and open up `index.html`. All you're going see is a text box and button. Let's try typing "Luke" into the text box and clicking the button. You'll see that we get a jumbled object outputted to the DOM. Obviously, we see "Luke Skywalker" in there somewhere, so we're going assume that the API call was successful. Now all we have to do is go through the object and see how to get access to just the character name. The easiest way to do this is to use console.log the api response inside the `.then()` method. After you do that, you'll find that the best way to get a hold of his info is `result.data.results[0]`, which will give you access to Luke's info. As much as we would love to leave it that long and have to retype that in our HTML every time we wanted to access Luke's info, let's clean that up a little bit by going back to the controller and replacing what we assign to `$scope.result` for `api_response.data.result[0]`. Now all we have to do is use `result`. Nice. 

Let's try to organize how this data looks on the DOM a little bit so it is easier for the user to understand. Let's go back to the DOM and look in that div we created. Looking at the huge list of key/value pairs that the response has, let's be lazy and just throw it all out on the screen at once, so we don't have to write every single one. Add this to the div as an attribute: `ng-repeat="(key, value) in result"`. Basically, what we're doing is iterating through the list of key/value pairs inside `$scope.result` and recreating another div for every individual key/value pair. Inside the div, we'll put `{{key}}: {{value}}`, which will put the key on the left side, and the value on the right side. It may seem a little confusing, but you'll see what I mean when you run it.

```text
<!DOCTYPE html>
<html ng-app="myFirstNgApp">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body ng-controller="myFirstController">

    <input type="text" ng-model="character">
    <button ng-click="makeAPIcall(character)">Search</button>

    <div class="" ng-repeat="(key, value) in result">
      {{key}}: {{value}}

      </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js" charset="utf-8"></script>
    <script src="app.js" charset="utf-8"></script>
  </body>
</html>
```
Now let's save and open `index.html` in the browser, the right-click and inspect the text we just outputted. You'll see that in our html in the editor, we only have one div, but it's with that `ng-repeat` attribute. In the browser, though, you have a single dive for every key/value pair. This is why `ng-repeat` is so useful. It also works for arrays. It will give you access to each index of the array. To test this theory, let's go back to the controller, and remove the `[0]` from the `$scope.result` declaration.

<pre><code>app.controller('myFirstController', function($scope, $http) {
  $scope.makeAPIcall = function(character) {
    $http.get('https://swapi.co/api/people/?search=' + character)
     .then(function(api_response) {
       console.log(api_response);
       $scope.result = api_response.data.results;
     });
  }
});
</code></pre>

Let's try searching it now and see what happens. `api_response.data.results` is an array, so it outputs a key of `0` and a value of index 0 of the `api_response.data.results` array. Granted, there's only one index of this array, but it still works the same way. Really quick, for semantic reasons, let's go back to the controller really quick and change `$scope.result` to `$scope.results`, considering that normally we would be getting more than one result. 

<pre><code>app.controller('myFirstController', function($scope, $http) {
  $scope.makeAPIcall = function(character) {
    $http.get('https://swapi.co/api/people/?search=' + character)
     .then(function(api_response) {
       console.log(api_response);
       $scope.results = api_response.data.results;
     });
  }
});
</code></pre>

Let's go back out to the DOM and change the `ng-repeat` attribute to: `ng-repeat="result in results"`. Let's just output the name and the bith_year, so let's go inside the div add two paragraph tags like this:

```text
<div class="" ng-repeat="result in results">
  <p>Character name: {{result.name}}</p>
  <p>Birth year: {{result.birth_year}}</p>
</div>
```

Okay, so now after saving it, opening `index.html`, and searching for "Luke", we see that it shows his name and birth year. Just for proof of concept, let's go back to the controller really quick and remove the character search query from the http call. This way, we'll just get a huge array of people.

<pre><code>app.controller('myFirstController', function($scope, $http) {
  $scope.makeAPIcall = function(character) {
    $http.get('https://swapi.co/api/people/)
     .then(function(api_response) {
       console.log(api_response);
       $scope.results = api_response.data.results;
     });
  }
});
</code></pre>

Go back now and save/reopen your index file and since we don't have to search anything, just click the button. SWAPI is a bit slow, so you might wonder if it's actually working, but if you wait a second, you'll see 87 people's names and birth years show up on the screen in the same format that we had Luke's in. Because we promised our friend that they could search for characters, though, let's change it back to have the search query again and call it a day. We went over a lot in this lesson. In the next lesson, we're going to talk about how to create your own service that you can inject into a controller. It's a really useful skill, especially when you want to keep your controllers "slimmer". It also helps the idea of SOC (Separation of Concern), but often it's just a really useful tool to use. See you in the next lesson!
