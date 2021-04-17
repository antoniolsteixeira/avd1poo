import { Router } from 'express';

const provasRouter = Router();

const arrayProvas = [
  {
    id: '001',
    diadasemana: 'segunda',
    datadaavd: '21/04/21',
    disciplina: 'POO',
    horario: '8 horas',
    professor: 'luiz',
  },
  {
    id: '002',
    diadasemana: 'terça',
    datadaavd: '22/04/21',
    disciplina: 'Banco',
    horario: '19:00',
    professor: 'debora',
  },
];

provasRouter.get('/', (request, response) => {
  try {
    return response.json(arrayProvas);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

provasRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const prova = await arrayProvas.find(provas => provas.id === id);

    return response.json(prova);
  } catch (erro) {
    return response.json('Prova nao encontrada.');
  }
});

provasRouter.post('/', async (request, response) => {
  try {
    const {
      diadasemana,
      datadaavd,
      disciplina,
      horario,
      professor,
    } = request.body;

    let idGerado = 0;

    const geradorID = Math.floor(Math.random() * 100);

    if (geradorID !== arrayProvas.length) {
      idGerado = geradorID;
    }

    if (diadasemana && datadaavd && disciplina && horario && professor) {
      arrayProvas.push({
        id: `${idGerado}`,
        diadasemana,
        datadaavd,
        disciplina,
        horario,
        professor,
      });
    }

    return response.json(arrayProvas);
  } catch (erro) {
    return response.json(
      'O campo dia da semana ou data da avd ou disciplina ou horario ou professor não existe no corpo da requisição.',
    );
  }
});

provasRouter.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const {
      diadasemana,
      datadaavd,
      disciplina,
      horario,
      professor,
    } = request.body;

    const prova = await arrayProvas.find(provas => provas.id === id);

    for (const i in arrayProvas) {
      if (arrayProvas[i].id === prova.id) {
        arrayProvas[i].diadasemana = diadasemana;
        arrayProvas[i].datadaavd = datadaavd;
        arrayProvas[i].disciplina = disciplina;
        arrayProvas[i].horario = horario;
        arrayProvas[i].professor = professor;
      }
    }

    return response.json(arrayProvas);
  } catch (erro) {
    return response.json('Não existe data da prova com este íd.');
  }
});

provasRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const prova = arrayProvas.find(provas => provas.id === id);

    for (const i in arrayProvas) {
      if (arrayProvas[i].id === prova.id) {
        arrayProvas.splice(arrayProvas[i], 1);
      }
    }

    return response.json(arrayProvas);
  } catch (erro) {
    return response.json(
      'Não existe data da prova com este id não encontrado.',
    );
  }
});

provasRouter.get('/professor/:professor', async (request, response) => {
  try {
    const { professor } = request.params;
    const professorArray = [];
    const professorProva = arrayProvas.find(
      provas => provas.professor === professor,
    );

    for (const i in arrayProvas) {
      if (arrayProvas[i].professor === professorProva.professor) {
        professorArray.push(arrayProvas[i]);
      }
    }

    return response.json(professorArray);
  } catch (erro) {
    return response.json('Não existe data da avd para este professor.');
  }
});

provasRouter.get('/disciplina/:disciplina', async (request, response) => {
  try {
    const { disciplina } = request.params;
    const disciplinaArray = [];
    const disciplinaProva = arrayProvas.find(
      provas => provas.disciplina === disciplina,
    );

    for (const i in arrayProvas) {
      if (arrayProvas[i].disciplina === disciplinaProva.disciplina) {
        disciplinaArray.push(arrayProvas[i]);
      }
    }

    return response.json(disciplinaArray);
  } catch (erro) {
    return response.json('Não existe data da avd para este professor.');
  }
});

export default provasRouter;
