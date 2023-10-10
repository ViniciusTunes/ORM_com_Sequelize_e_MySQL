const database = require('../models/index.js')

class MatriculaController {
    static async pegarTodasMatriculas(req, res) {
        try {
            const pegarTodasMatriculas = await database.Matriculas.findAll()
            if (pegarTodasMatriculas === null) {
                return res.status(404).json({ mensagem: "Não há matrículas cadastradas." });
            }
            return res.status(200).json(pegarTodasMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegarUmaMatricula (req, res) {
        const { estudanteID, matriculaID } = req.params;
        try {
            const pegarUmaMatricula = await database.Matriculas.findOne({ 
                where: { 
                id : Number(matriculaID),
                estudante_id: Number(estudanteID) 
                } 
            });
            if (pegarUmaMatricula === null) {
                return res.status(404).json({ mensagem: "Matrícula não encontrada." });
            }
            return res.status(200).json(pegarUmaMatricula);
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criarMatricula(req, res) {
        const { estudanteID } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteID) };
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarMatricula(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            const matriculaExiste = await database.Matriculas.findOne({ where: { id: Number(id) }});

            if (!matriculaExiste) {
                return res.status(404).json({ error: 'Pessoa não encontrada.' });
            }
            await database.Matriculas.update(novasInfos, { where: { id: id }});
            const nivelAtualizado = await database.Matriculas.findOne({ where: { id: Number(id) }});
            return res.status(200).json(matriculaExiste);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarMatricula(req, res) {
        const { id } = req.params;
        try {
            await database.Matriculas.destroy({ where: { id: id } });
            return res.status(200).json({ message: `Matricula com ID ${id} foi deletada com sucesso` });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MatriculaController;