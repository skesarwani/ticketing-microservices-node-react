import request from 'supertest';
import { app } from '../../../app/app';


it('returns 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test1',
            password: 'password'
        })
        .expect(400);
});


it('returns 400 with missing email or password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({
            password: 'testing'
        })
        .expect(400);
});

it('fails for a not existing email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test1@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);


    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password1'
        })
        .expect(400);
});

it('responds with valid cookie with correct credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);


    const res = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    expect(res.get('Set-Cookie')).toBeDefined();
});