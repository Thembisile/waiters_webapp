module.exports = function (pool){

    async function wholeWeek (){
        let days = await pool.query('SELECT * FROM week;');
        return days.rows;
    }

    async function chooseDay(day){
        let day = await pool.query('SELECT * FROM week WHERE the_day = $1', [day])
    }


    return {
        wholeWeek,
        chooseDay
    }
}