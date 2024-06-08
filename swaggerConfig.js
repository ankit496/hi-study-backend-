const swaggerJsdoc=require('swagger-jsdoc');
require('dotenv').config()
const servers = process.env.NODE_ENV === 'production'
  ? [{ url: process.env.PROD_URL }]
  : [{ url: process.env.LOCAL_URL }];
const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Hi-study Backend',
            version:'1.0.0',
            description:'The current api includes instructor and user side apis'
        },
        servers:servers,
    },
    apis:['./routes/*.js']
}
const specs=swaggerJsdoc(options)
module.exports=specs