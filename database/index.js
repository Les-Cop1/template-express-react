const pool = require('../database/connection')

const usersInfo = async () => {
    let conn
    let response = {
        success: true
    }

    try {
        conn = await pool.getConnection();

        let res = await conn.query(`SELECT user_num as id, user_name as username FROM user`);

        response = {...response, res}

    } catch (err) {
        response = {...response, success: false, error: err}
    } finally {
        if (conn) {
            await conn.end();
        }
    }

    return response
}

module.exports = {usersInfo}
