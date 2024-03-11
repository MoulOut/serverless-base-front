import geraUrlPreAssinada from './geradorUrlS3';

const BASE_URL = 'http://localhost:3001';

function buildFetchObj(metodo, contentType, body) {
  return {
    method: metodo,
    headers: {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET',
    },
    body: body,
  };
}

async function criaRegistro(novoRegistro) {
  const fetchObj = buildFetchObj(
    'POST',
    'application/json',
    JSON.stringify(novoRegistro)
  );
  try {
    const res = await fetch(`${BASE_URL}/alunos`, fetchObj);
    return res.json();
  } catch (erro) {
    return erro;
  }
}

async function enviaArquivoViaURL(url, arquivo) {
  const fetchObj = buildFetchObj('PUT', 'text/csv: charset=utf-8', arquivo);

  try {
    const res = await fetch(url, fetchObj);

    if (res.status === 200) {
      return 'Upload feito com sucesso.';
    } else {
      return 'Falha no upload.';
    }
  } catch (error) {
    return error;
  }
}

async function geraPresignURL(nomeArquivo) {
  const urlChave = await geraUrlPreAssinada(nomeArquivo);

  return urlChave;
}

export { criaRegistro, enviaArquivoViaURL, geraPresignURL };
