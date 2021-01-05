# [Solution for this Challenge](https://dmoj.ca/problem/ccc05j4)

View page [here](https://destroyer22719.github.io/Spiraling-Circle-Challenge/)

This is a solution I made to solve the Canadian Computing Competition. Honestly speaking this is a really difficult and challenging quesiton even for me. I made this to share others my solution.

## How it works

### Why I am using HTML and CSS
I am using HTML and CSS because having elements and classes helped organize and visualize the problem. Instead of having something disorientated and discoordinated such as arrays I used flexboxes.

Here is an example of a grid:
```html
<div class="grid">
  <div class="grid-row">
    <div class="tile cover"></div>
    <div class="tile"></div>
    <div class="tile cover"></div>
  </div>
    <div class="grid-row">
    <div class="tile"></div>
    <div class="tile"></div>
    <div class="tile"></div>
  </div>
    <div class="grid-row">
    <div class="tile cover"></div>
    <div class="tile"></div>
    <div class="tile cover"></div>
  </div>
</div>
```
That is how I easily organize the grid layout for Bridget to navigate in. This also helps me because it's easy to navigate.

```javascript
$(".grid-row:nth-child(3)>tile:nth-child(2)");
```

I accessed the 3rd row at the 2nd column easily and conviniently with JavaScript 

I also added the class `.cover` for the corners, and any previous path Bridget travels. This is useful because it checks the validity of the direction

## How I made Bridget to properly navigate

![Diagram](https://i.imgur.com/r7x60l7.png)

In the code I had different priorities in the direction Bridget should navigate in. 

At first the priority is Right, Down, Up, Left. Which means it goes right, if it's not valid, go Down, if up is not valid, go left, and if neither is valid Bridget is done. 

At different parts of the grid the priorities changed. At the 3rd tile the priority changed from Right, Down, Up, Left (RDUL), to Left, Up, Right, Down (LURD), and when it's approaching the 1th tile it changes back to the original RDUL.

These direction order priorities ensure that Bridget navigates on the edge clockwise. 

Unfortunately I did not implement a slowmotion to see bridget moving because `while` loops and `setTimeout` don't go well together

You can view the code in futher detail in `app.js`