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
