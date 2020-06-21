import request from 'supertest';
import { app } from '../../../app/app';


it('responds with current user details', async () => {

    const cookie = await global.signin();

    const res = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(res.body.currentUser.email).toEqual('test@test.com');
});


it('responds with null if not authenticated', async () => {
    const res = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(res.body.currentUser).toEqual(null);
});