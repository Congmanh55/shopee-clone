import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Schema, schema } from '../../utils/rules'
// import { Omit } from 'lodash'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../api/auth.api'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ResponseApi } from '../../types/utils.type'
import Input from '../../components/Input'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

type FormDataLogin = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormDataLogin>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormDataLogin) => login(body)
  })

  const onSubmit = handleSubmit(data => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        const message = data.data?.message
        toast.success(message)
      },

      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormDataLogin>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='max-w-7xl mx-auto px-4 container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form noValidate onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm'>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                className='mt-8'
                name='email'
                type='email'
                register={register}
                errorMessage={errors.email?.message}
                placeholder='Email...'
                autoComplete='on'
              />
              <Input
                className='mt-2'
                name='password'
                type='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Password...'
                autoComplete='on'
              />
              <div className='mt-3'>
                <button type='submit' className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600">
                  Đăng Nhập
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className='text-gray-300'>
                  Bạn chưa có tài khoản?
                </span>
                <Link className='text-red-400 ml-1' to={'/register'}>Đăng ký</Link>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Login
