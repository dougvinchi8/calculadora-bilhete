const valores = {
  metro: 5.20,
  onibus: 5.00,
  integracao: 8.90
};

document.getElementById('toggleTheme').addEventListener('change', function () {
  document.body.classList.toggle('dark');
});

function calcular() {
  const dataInicio = new Date(document.getElementById('dataInicio').value);
  const dataFim = new Date(document.getElementById('dataFim').value);
  const jornada = document.getElementById('tipoJornada').value;
  const tipoIda = document.getElementById('tipoIda').value;
  const tipoVolta = document.getElementById('tipoVolta').value;
  const ignoradasStr = document.getElementById('datasIgnoradas').value.trim();
  const datasIgnoradas = ignoradasStr ? ignoradasStr.split(',').map(d => d.trim()) : [];

  if (dataFim < dataInicio) {
    alert("A data final deve ser maior ou igual à data inicial.");
    return;
  }

  let diasUteis = 0;
  let atual = new Date(dataInicio);

  while (atual <= dataFim) {
    const dia = atual.getDay();
    const dataStr = atual.toISOString().split('T')[0];

    if (dia !== 0 && dia !== 6 && !datasIgnoradas.includes(dataStr)) {
      diasUteis++;
    }
    atual.setDate(atual.getDate() + 1);
  }

  let custoPorDia = 0;

  if (jornada === 'idaEVolta') {
    custoPorDia = valores[tipoIda] + valores[tipoVolta];
  } else if (jornada === 'apenasIda') {
    custoPorDia = valores[tipoIda];
  } else if (jornada === 'apenasVolta') {
    custoPorDia = valores[tipoVolta];
  }

  const total = (custoPorDia * diasUteis).toFixed(2);

  document.getElementById('resultado').innerHTML =
    `<p><strong>Dias úteis válidos:</strong> ${diasUteis}</p>
     <p><strong>Custo por dia:</strong> R$ ${custoPorDia.toFixed(2)}</p>
     <p><strong>Total a carregar:</strong> R$ ${total}</p>`;
}
