import request from 'supertest';
import { app } from '../../../app/app';
import { Ticket } from '../../../app/models/ticket';
import mongoose from 'mongoose';

const id = new mongoose.Types.ObjectId().toHexString();

it('returns a 404 if provided id does not exist', async () => {
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'testTitle',
            price: 10
        })
        .expect(404);
});

it('returns 401 if user is not authenticated', async () => {
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'testTitle',
            price: 10
        })
        .expect(401);
});

it('returns 401 if user does not own ticket', async () => {
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'testTitle',
            price: 10
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'testTitle1',
            price: 200
        })
        .expect(401);
});

it('returns a 400 if user provides invalid title or price', async () => {
    const cookie = global.signin();
    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: 'testTitle',
        price: 10
    })
    .expect(201);
    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 10
        })
        .expect(400);

        await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'kjhjn',
            price: -10
        })
        .expect(400);
});

it('updates a ticket with valid inputs', async () => {
    const cookie = global.signin();
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'testTitle',
            price: 10
        })
        .expect(201);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'newTitle',
            price: 200
        })
        .expect(200);
    
    const ticketRes = await request(app)
        .get(`/api/tickets/${res.body.id}`)
        .send()
        .expect(200);

    expect(ticketRes.body.title).toEqual('newTitle');
});