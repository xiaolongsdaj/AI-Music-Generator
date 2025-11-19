import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs/server'
import '../../globals.css'

async function Page() {
    const user = await currentUser()
    const userInfo = {
        id:user?.id,
        username:user?.username,
        name:user?.firstName || '',
        bio:'',
        image:user?.imageUrl
    }

    return(
        <main className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl flex-col justify-start px-10 py-20'>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Complete Your Profile</h1>
                <p className='text-base text-gray-300 mb-8'>Fill in your details to get started with Threads</p>
                <section className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8'>
                <AccountProfile user={userInfo} btnTitle="Continue" />
                </section>
                <div className='mt-8 text-center text-gray-400 text-sm'>
                    <p>Already have an account? <a href="/sign-in" className="text-blue-400 hover:underline">Sign in</a></p>
                </div>
            </div>
        </main>
    )
}
export default Page