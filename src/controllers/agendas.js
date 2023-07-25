const knex = require('../connection')

const newAgenda = async (req, res) => {
    const {agenda_name, agenda_type, procedure_type, start_time, end_time, date, slots_available, additional_slots, is_active} = req.body;

    try {
        if(start_time >= end_time){
            return res.status(400).json({message: 'Escolha um horário válido para a agenda.'})
        }

        if( new Date(date).getUTCFullYear() < new Date().getUTCFullYear() ||
            new Date(date).getUTCMonth() < new Date().getUTCMonth() ||
            new Date(date).getUTCDate() < new Date().getUTCDate() ){
            return res.status(400).json({message: 'Não é possivel cadastrar agendas em datas passadas'})
        }

        const newAgenda = await knex('agendas').insert({
            agenda_name,
            agenda_type,
            procedure_type, 
            start_time, 
            end_time, 
            date, 
            slots_available, 
            additional_slots, 
            is_active,
            user_id: req.user.id
        }).returning('*')
        return res.status(200).json(newAgenda)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const showAgendas = async (req, res) => {
    try {
        const allAgendas = await knex('agendas')
        return res.status(200).json(allAgendas)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = { 
    newAgenda,
    showAgendas
 }