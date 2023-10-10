const database = require('../models/index.js')

class PessoaController {
    static async pegarTodasPessoas(req, res) {
        try {
            const TodasPessoas = await database.Pessoas.findAll();
            return res.status(200).json(TodasPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegarUmaPessoa(req, res) {
        const { nome } = req.params;
        try {
            const umaPessoa = await database.Pessoas.findOne({ where: { nome: nome } });

            if (!umaPessoa) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }
            return res.status(200).json(umaPessoa);

        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
        }
    }

    static async pegarUmaPessoaPorID(req, res) {
        const { id } = req.params;
        try {
            const umaPessoaPorID = await database.Pessoas.findOne({ where: { id: id } });

            if (!umaPessoaPorID) {
                return res.status(404).json({ error: 'Pessoa não encontrada' });
            }
            return res.status(200).json(umaPessoaPorID);
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor', message: error.message });
        }
}

    static async criarPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json({ Nova_Pessoa_Criada: novaPessoaCriada });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            const pessoaExiste = await database.Pessoas.findOne({ where: { id: Number(id) }});

            if (!pessoaExiste) {
                return res.status(404).json({ error: 'Pessoa não encontrada.' });
            }
            await database.Pessoas.update(novasInfos, { where: { id: id }});
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) }});
            return res.status(200).json(pessoaExiste);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ where: { id: id } });
            return res.status(200).json({ message: `Pessoa com ID ${id} foi deletada com sucesso` });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PessoaController;