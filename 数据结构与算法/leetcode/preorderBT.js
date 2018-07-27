let res = []
var preorderTraversal = function(root) {

    return __preorderTraversal(root);

};

function __preorderTraversal(root) {
    if(!root) return res;
    
    res.push(root.val);
    preorderTraversal(root.left);
    preorderTraversal(root.right);
    return res; 
}

{
  "$id":"1",
  "children":[
    {
      "$id":"2","children":[
        {
          "$id":"3",
          "children":[],
          "val":5
        },{
          "$id":"4",
          "children":[],
          "val":0
        }
      ],
      "val":10
    },
    {
      "$id":"5",
      "children":[{"$id":"6","children":[],"val":6}],
      "val":3
    }
  ],
  "val":1
}