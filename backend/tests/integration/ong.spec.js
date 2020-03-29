const request = require ('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async() => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async() => {
        await connection.destroy();
    })

    it('should be able to acreate a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "teste",
	        email: "teste@gmail.com",
            whatsapp: "51000000000",
            city: "Porto Alegre",
            uf: "RS"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});