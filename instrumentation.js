import connect from '@/config/db.js'

export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') return;
    return await connect()
}