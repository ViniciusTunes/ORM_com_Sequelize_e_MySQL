const database = require('../models/index.js')

class NivelController {
    static async pegarTodosNiveis (req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()

            if (todosOsNiveis === null) {
                res.status(404).json({ error: 'Nível não encontrado.' });
            }
            return res.status(200).json(todosOsNiveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegarUmNivel (req, res) {
        const { id } = req.params;
        try {
            const pegarUmNivel = await database.Niveis.findOne({ where: { id: id } });

            if (pegarUmNivel == null) {
                res.status(404).json({ error: 'Nível não encontrado.' });
            }
            
            return res.status(200).json(pegarUmNivel);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criarNivel(req, res) {
        const novoNivel = req.body;
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel);
            return res.status(200).json({ Novo_Nivel_Criado: novoNivelCriado });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarNivel(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;

        try {
            const nivelExiste = await database.Niveis.findOne({ where: { id: Number(id) }});

            if (!nivelExiste) {
                return res.status(404).json({ error: 'Pessoa não encontrada.' });
            }
            await database.Niveis.update(novasInfos, { where: { id: id }});
            const nivelAtualizado = await database.Niveis.findOne({ where: { id: Number(id) }});
            return res.status(200).json(nivelAtualizado);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarNivel(req, res) {
        const { id } = req.params;
        try {
            await database.Niveis.destroy({ where: { id: id } });
            return res.status(200).json({ message: `Nivel com ID ${id} foi deletada com sucesso` });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = NivelController;