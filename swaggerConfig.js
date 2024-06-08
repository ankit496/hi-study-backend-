const swaggerJsdoc=require('swagger-jsdoc');
const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Hi-study Backend',
            version:'1.0.0',
            description:'The current api includes instructor and user side apis'
        },
        servers:[
            {
                url:'http://localhost:5000'
            },
        ],
    },
    apis:['./routes/*.js']
}
const specs=swaggerJsdoc(options)
module.exports=specs