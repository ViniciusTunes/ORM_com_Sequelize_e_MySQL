const database = require('../models/index.js')

class TurmaController {
    static async pegarTodasTurmas(req, res) {
        try {
            const TodasTurmas = await database.Turmas.findAll();
            return res.status(200).json(TodasTurmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegarUmaTurma(req, res) {
        const { id } = req.params;
        try {
            const umaTurma = await database.Turmas.findOne({ where: { id: id } });
            if (umaTurma === null) {
                console.log(`Pessoa não encontrada.`);
            }
            return res.status(200).json(umaTurma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarTurma(req, res) {
        const novaTurma = req.body;
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma);
            return res.status(200).json({ Nova_Turma_Criada: novaTurmaCriada });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarTurma(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            const turmaExiste = await database.Turmas.findOne({ where: { id: Number(id) }});

            if (!turmaExiste) {
                return res.status(404).json({ error: 'Pessoa não encontrada.' });
            }
            await database.Turmas.update(novasInfos, { where: { id: id }});
            const TurmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) }});
            return res.status(200).json(TurmaAtualizada);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.destroy({ where: { id: id } });
            return res.status(200).json({ message: `Turma com ID ${id} foi deletada com sucesso` });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TurmaController;