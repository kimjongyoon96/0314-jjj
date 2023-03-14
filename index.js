const fs=require('fs');
const http = require('http');
// require 포케몬 정보를 "요청"한다.
const pokemon = require('pokemon');
// 실질적으로 내가 작성하는 포인트
const formTag = `
<div>귀여운 윤이</div>
<h1>cute dog </h1>
<img src="/picture" width="200px">
<form method="GET" action="/pokeName"> 
<input type="text" name="id">
<input type="submit"> 
</form>
`;
function greet(fromSubmitString) {
return `<h1>${fromSubmitString}</h1>`;
}
function firstPage(data) {
return`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
${data}
</body>
</html>
`;
}
// NPM에서 README를 봐서, 그에 맞는 함수를 만들어준다.
// 내가 원하는건, 한글로 포켓몬을 작성하면, 영어로 나오는것
//  let id=pokemon.getId(pokeMon, 'ko'); == ID값을 나오게 설정
//  let Name=pokemon.getName(id, 'en'); id값에 맞는 영어 이름을 나오게
     

function nameChanger(pokeMon){

  let id=pokemon.getId(pokeMon, 'ko');
  let Name=pokemon.getName(id, 'en');


return Name 
}
console.log(nameChanger("파이리"));
//  옥천허브 물류창고 입구
const server = http.createServer(function(request, response){
// 최초접속
// 리퀘스트 url =/ 즉 첫페이지라면,
// page 라는 안창살을 내놔라
if(request.method === 'GET' && request.url === '/') {
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(formTag);
response.write(page);
response.end();
//? 처음 페이지에 접속하면 앞서 설정해놨던 formTag를 띄워준다.
}
// 옥천 물류센터 소고기섹터
// 가위질을 해서, ?id= 뒤에 나오게 해라.
// 
if(request.method === 'GET' && request.url.startsWith('/pokeName')) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  console.log(decodeURIComponent(request.url.split("=")[1]));
  response.write(firstPage("<div>" + nameChanger(decodeURIComponent(request.url.split("=")[1]))+"people"+"</div>"));
  
 response.end();

// if(request.method === 'GET' && request.url ==='/picture'){
//       response.writeHead(200, {'Content-Type': 'jpg'});
//       response.write(firstPage('./picture/Dog.jpg')
//       response.end();    
//   });
// }



}});



// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});