module.exports = function(pool){

    async function allWaiters(){
        let outcome = await pool.query('SELECT * FROM waiters;');
        return outcome.rows;
    }

    async function chooseWaiter(waiter_name){
        let outcome = await pool.query('SELECT * FROM waiters WHERE waiter_name = $1', [waiter_name]);
        return outcome.rows;
    }

    return {
        allWaiters,
        chooseWaiter
    }
}