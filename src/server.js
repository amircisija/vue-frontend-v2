import { Server, Response } from 'miragejs'

new Server({
  seeds(server) {
    server.db.loadData({
      formdatas: {}
    })
  },

  routes() {
    this.timing = 50
    this.namespace = 'api'

    this.get('/data', (schema) => {
      return schema.db.formdatas
    })

    this.post('/data', (schema, request) => {
      const formdata = JSON.parse(request.requestBody);

      return schema.db.formdatas.insert({
        'firstname': formdata.firstname,
        'lastname': formdata.lastname,
        'gender': formdata.gender,
        'message': formdata.message,
        'confidential': formdata.confidential,
        'terms': formdata.terms,
      })
    })
  }
})
