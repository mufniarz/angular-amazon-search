mazon Search with AngularJS

* Amazon search box with auto-complete 
* only client-side codes 

##How to use
use index.html or index.jade

include JS files in lib/,main.js and query-generator.js

put your own AWS key in main.js 

also you can use options of

* Associate Tag,Operation and SearchIndex

```main.js
app
  .value('constants', {
    //your own aws keys must be used here.
    AWSAccessKeyId: 'Your AWS Key',
    AWSsecretkeyId: 'Your AWS Key',
    URI: "ecs.amazonaws.jp"
  })  
  .value('options', {
    //These parameters can be changed for searching category and methods
    AssociateTag: 'your Associate tag',
    Operation: "ItemSearch",
    SearchIndex: "Books",
  });
``` 



##Attention: You should not use this on your website!!

* AWS secret key is on the client side code
* therefore, on security purpose ,you should use these secret keys where client users can not see.
* In Hybrid mobile apps you may be able to use this search box with security.
* Server-side code is the best and there are many library like that.
* 
