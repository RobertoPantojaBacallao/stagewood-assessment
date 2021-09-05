const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql')
const path = require('path')

const app = express()
const db = mysql.createConnection({
    host: "seed.ccjzj5w4kgje.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "goldtunerer",
    database: 'seed'
  })

  async function DBQuery(Query){
      return new Promise(data => {
        db.query(Query, function(err, res) {
            if(err){
                console.log(err)
                return
            }
            try{
                data(res)
            } catch(e) {
                console.log(e)
                return
            }
        })
      })
  }

    async function start()
    {   
        rows = await DBQuery('SELECT event.*, photo.source FROM event, photo WHERE event.id = photo.eventId')
        id = []
        title = []
        startDate = []
        source = []
        date = []

        for (i in rows) {
            id[i] = rows[i].id
            title[i] = rows[i].title.trim()
            source[i] = rows[i].source
            date = String(rows[i].startDate).substr(0,15).split(' ')
            switch(date[1]){
                case 'Jan':
                    date[1] = 1
                    break;
                case 'Feb':
                    date[1] = 2
                    break;
                case 'Mar':
                    date[1] = 3
                    break;
                case 'Apr':
                    date[1] = 4
                    break;
                case 'May':
                    date[1] = 5
                    break;
                case 'Jun':
                    date[1] = 6
                    break;
                case 'Jul':
                    date[1] = 7
                    break;
                case 'Aug':
                    date[1] = 8
                    break;
                case 'Sep':
                    date[1] = 9
                    break;
                case 'Oct':
                    date[1] = 10
                    break;
                case 'Nov':
                    date[1] = 11
                    break;
                case 'Dec':
                    date[1] = 12
                    break;
                default:
                    console.log('Invalid Month');
                    break;
            }
            startDate[i] = date[3] + '/' + date[1] + '/' + date[2]
        }

        const schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'event',
                fields: () =>({
                    id: { 
                        type: GraphQLList(GraphQLString),
                        resolve: () => id },
                    title: { 
                        type: GraphQLList(GraphQLString),
                        resolve:() => title },
                    startDate: { 
                        type: GraphQLList(GraphQLString),
                        resolve:() => startDate },
                    source: { 
                            type: GraphQLList(GraphQLString),
                            resolve:() => source },
                    
                })
            })
        })

        app.use( cors() );
        app.use('/graphql', graphqlHTTP({
            schema: schema,
            graphiql: true
        }));
        // app.use(express.static('public'));

        // app.get('*', (req, res) => {
        //     res.sendFile(path.resolve(__dirname__, 'public', 'index.html'))
        // })

        app.listen(process.env.PORT || 5000, () => console.log('Server Running'))

    }

start()