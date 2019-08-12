import {resolvers} from './data.js/resolvers'
import {ApolloServer} from 'apollo-server-express';
//import {typeDefs} from './data.js/schema'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({path: 'variables.env'})
import jwt from 'jsonwebtoken';
import {importSchema} from 'graphql-import'

const typeDefs = importSchema('src/data.js/schema.graphql');
const app = express();

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context : async ({req}) => {
        //obtener token
        const token = req.headers['authorization'];
        if(token !== 'null'){
            try {
                //verificar el token del cliente
                const usuarioActual = await jwt.verify(token, process.env.SECRETO)
                req.usuarioActual = usuarioActual;
                return {usuarioActual}
            } catch (error) {
                console.log(error)
            }
        }
    }

    });

server.applyMiddleware({app})

app.listen({port: 4000}, () => console.log(`Servidor corriendo en http://localhost:4000${server.graphqlPath}`))