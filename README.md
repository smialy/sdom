# sdom


### HTML
```html
<h1></h1>
<div id="user">
    <span class="name"></span>
    <span class="role"></span>
</div>
```
### JS
```javascript
import create from 'sdom';

var handler = create({
    title:'h1@text',
    user:{
        id:'#user@dataset:uid',
        name:'#user .name@text',
        role:'#user .role@text'
    }
});

handler.update({
    title:'Title',
    user:{
        id:123,
        name:"Smialy",
        role:"owner"
    }
});
```

### Result
```html
<h1>Title</h1>
<div id="user" data-uid="123">
    <span class="name">Smialy</span>
    <span class="role">owner</span>
</div>
```
