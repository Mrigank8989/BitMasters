const swaggerAutogen=require('swagger-autogen')();
const doc={
    info:{
        title:'My test',
        description:'Api testing for axeSuite-admin-panel just got it'
    },
    host:'localhost:5000',
    basePath: '/api',
    schemes:['http'],
    
    
};

const outputfile='./swagger-output.json';
const routes=['D:/BitMasters/BitMasters/routes/userRoute.js'];

swaggerAutogen(outputfile, routes, doc).then(() => {
    console.log('Swagger documentation generated successfully');
});