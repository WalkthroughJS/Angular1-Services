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

As an aside: Despite what people say about using console.log(), as long as you clean all the logs up after you're done, there's nothing wrong with it. Back on topic, though. 

Let's go back to `index.htm
