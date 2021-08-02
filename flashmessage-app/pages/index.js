import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Index = () => {
  const router = useRouter()
  const form = useFormik({
    initialValues: {
      message: '',
      expiresIn: '15',
    },
    onSubmit: async (values) => {
      const result = await fetch('/api/send-message', {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
      const json = await result.json()
      router.push('/msg?id=' + json.id)
    },
  })
  return (
    <>
      <Head>
        <title>Flash Message App</title>
      </Head>
      <div className='h-screen mx-auto max-w-md'>
        <img className='mx-auto' src='/logo.png' />
        <h1 className='text-white text-5xl text-center font-bold'>
          Flash Message
        </h1>
        <form className='mt-4' onSubmit={form.handleSubmit}>
          <textarea
            className='p-3 rounded-xl border-0 text-white shadow-sm bg-gray-900 h-28 w-full'
            onChange={form.handleChange}
            value={form.values.message}
            name='message'
            placeholder='Type your private message'
          ></textarea>
          <div className='text-center'>
            <label className='text-white'>expires in:</label>
            <select
              className='p-3 rounded-xl border-0 text-white shadow-sm bg-gray-900'
              onChange={form.handleChange}
              name={'expiresIn'}
              value={form.values.expiresIn}
            >
              <option value='15'>15 seconds</option>
              <option value='30'>30 seconds</option>
              <option value='60'>1 minutes</option>
              <option value='120'>2 minutes</option>
              <option value='1800'>30 minutes</option>
            </select>
          </div>
          <button
            type='submit'
            className='bg-yellow-500 p-3 rounded-lg w-full h-full hover:bg-yellow-600'
          >
            {' '}
            Send your flash message!
          </button>
        </form>
      </div>
    </>
  )
}

export default Index
