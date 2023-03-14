const http = require('http');
const pokemon =require('pokemon');
const formTag = `
<div>귀여워 윤이</div>
<form method="GET" action="/login/ggg.sss"> 
<input type="text" name="id">
<input type="submit"> 
</form>
`;
function greet(fromSubmitString) {
return `<h1>${fromSubmitString}</h1>`;
}
function firstPage(data) {
return `
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

// 첫번째 관문, 옥천허브 입구
const server = http.createServer(function(request, response){
// 최초접속
if(request.method === 'GET' && request.url === '/') {
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(formTag);
response.write(page);
response.end();
//? 처음 페이지에 접속하면 앞서 설정해놨던 formTag를 띄워준다.
}
// 무언가
// 옥천허브, 소고기 구분하는 구간
if(request.method === 'GET' && request.url.startsWith('/pokemon')) {
const name = request.url.split('=')[1];
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(greet(name))

response.write(page);
response.write("<div style='background-color : red'>hello</div>");
response.write(page);
//? write의 개수는 몇개가 쓰여지든 상관 없는지 확인. html 페이지니까 write일 때 style속성을 부여해도 적용되는지 확인.
response.end();
}
});



// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});
