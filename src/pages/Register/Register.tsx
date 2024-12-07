import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { schema } from '../../utils/rules'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../api/auth.api'
import { Omit, omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

export interface FormData {
  email: string,
  password: string,
  confirm_password: string
}

const Register = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data?.user!)
        navigate('/')
        const message = data.data?.message
        toast.success(message)
      },

      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
            <form onSubmit={onSubmit} className='p-10 rounded bg-white shadow-sm' noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                type='email'
                name='email'
                className='mt-8'
                register={register}
                errorMessage={errors.email?.message}
                placeholder='Email...'
                autoComplete='on'
              />
              <Input
                type='password'
                name='password'
                className='mt-2'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Password...'
                autoComplete='on'
              />
              <Input
                type='password'
                name='confirm_password'
                className='mt-2'
                register={register}
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password...'
                autoComplete='on'
              />
              <div className='mt-2'>
                <Button
                  type='submit'
                  className="flex justify-center items-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className='text-gray-300'>
                  Bạn đã có tài khoản?
                </span>
                <Link className='text-red-400 ml-1' to={'/login'}>Đăng nhập</Link>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Register
