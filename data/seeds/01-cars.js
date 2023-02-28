exports.seed = async function(knex) {
    await knex('cars').insert([
        {
            vin:'01', 
            make:'Mitsubishi',
            model:'Lancer',
            mileage:'10000',
            title:'Ölücüler Yazmasın',
            transmission:'Manuel'
        },
        {
            vin:'02', 
            make:'BMW',
            model:'M5',
            mileage:'35000',
            title:'Dont Cry',
            transmission:'Otomatik'
        },
        {
            vin:'03', 
            make:'Audi',
            model:'A5',
            mileage:'67000',
            title:'Favorin Sen de Biliyorsun',
            transmission:'Otomatik'
        },
        {
            vin:'04', 
            make:'Seat',
            model:'Leon',
            mileage:'98000',
            title:'Hatıralar...',
            transmission:'Otomatik'
        }
    ]);
};
