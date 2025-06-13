// 1. Importa os módulos necessários do Node.js
const http = require("http"); // Para criar o servidor
const fs = require("fs"); // Para ler arquivos do sistema (File System)
const path = require("path"); // Para lidar com caminhos de arquivos de forma segura

// 2. Define o endereço e a porta
const hostname = "127.0.0.1";
const port = 3000;

// 3. Cria o servidor
const server = http.createServer((req, res) => {
  // Pega o caminho do arquivo solicitado na URL. Ex: /login.html
  // Se a URL for apenas "/", usa "index.html" como padrão.
  let filePath = req.url === "/" ? "/index.html" : req.url;

  // Constrói o caminho completo para o arquivo no seu computador.
  let fullPath = path.join(__dirname, filePath);

  // Tenta ler o arquivo solicitado
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      // Se der erro (ex: arquivo não encontrado), envia uma página de erro 404.
      res.writeHead(404);
      res.end("<h1>Erro 404: Arquivo nao encontrado</h1>");
    } else {
      // Se o arquivo for encontrado, envia o conteúdo dele para o navegador.
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(content);
    }
  });
});

// 4. Inicia o servidor
server.listen(port, hostname, () => {
  console.log(`Servidor rodando! Acesse o link: http://${hostname}:${port}/`);
  console.log("Agora ele está servindo os seus arquivos HTML!");
});
