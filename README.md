# simple-mysql-query
simple mysql query with promise 

# install 
```
npm i simple-mysql-query
```

# usage
```
const query = require('simple-mysql-query');
```
#### set config in main file
```
query({
	host : '127.0.0.1',
	port : '3306',
	user : 'root',
	password : 'root',
	database : 'db'
})
```
#### query simple sql in other files
```
query({
	sql : 'select * from table where name=? ',
	params : ['name']
}).then(rs => {
	const list = rs[0];
	console.log(list);
}).catch(e => console.log(e));
```
#### query multi sql in other files
```
query([{
	sql : 'select * from table where name=? ',
	params : ['name']
},{
	sql : 'select * from table2 where name=?',
	params : ['name']
}]).then(rs => {
	const list = rs[0];
	console.log(list);
	const list2 = rs[1];
	console.log(list2);
}).catch(e => console.log(e));
```

# license 
MIT LICENSE