const db = require('../db/connect')

class President {
    constructor({president_id, name, president_name, country_id}){
        this.president_id = president_id
        this.name = name
        this.president_name = president_name
        this.country_id = country_id
    
}
static async getAll() {
        const response = await db.query('SELECT * FROM presidents;')

        if (response.rows.length === 0){
            throw new Error('No presidents available')
        }

        return response.rows.map(c => new President(c))

    }

    static async getOneByPresidentName(president_name){
        const response = await db.query('SELECT * FROM presidents WHERE LOWER(president_name) = LOWER($1);',
           [president_name])

        if (response.rows.length != 1){
            throw new Error('Unable to locate country')

        }
        return new President(response.rows[0])
    }

    static async create(data){
        const { name, president_name, country_id } = data
        const existingPresident = await db.query('SELECT name FROM presidents WHERE LOWER(president_name) = LOWER($1);', [name])

        if (existingPresident.rows.length === 0){
            let response = await db.query('INSERT INTO country (name, president_name, country_id) VALUES ($1, $2, $3) RETURNING *;',
                [name, president_name, country_id])

                return new President(response.rows[0])
            
        } else {
            throw new Error('A country with this name already exists')
        }
    }

        async destroy(){
            let response = await db.query('DELETE FROM presidents WHERE president_name = $1 RETURNING *;',
                [this.name]
            )
            return new President(response.rows[0])
        }

        async update(data){
            const name = data.name || this.name
            const president_name = data.president_name  || this.president_name 
            const country_id = country_id  || this.country_id 
            
            
            const response = await db.query('UPDATE presidents SET name = $1, president_name = $2, country_id = $3 WHERE country_id = $4 RETURNING *;',
                [name, president_name, country_id, this.president_id]
       )
       
       return new President(response.rows[0])
    }


}



module.exports = President