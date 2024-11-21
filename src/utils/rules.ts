import { RegisterOptions } from "react-hook-form"
import { FormData } from "../pages/Register/Register"
import * as yup from "yup"

type Rules = { [key in keyof FormData]?: RegisterOptions<FormData, key> }

export const getRules = (): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email la bat buoc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email khong dung dinh dang'
    },
    maxLength: {
      value: 160,
      message: 'Do dai tu 5 den 160 ky tu'
    },
    minLength: {
      value: 5,
      message: 'Do dai tu 5 den 160 ky tu'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password la bat buoc'
    },
    maxLength: {
      value: 160,
      message: 'Do dai tu 6 den 160 ky tu'
    },
    minLength: {
      value: 6,
      message: 'Do dai tu 6 den 160 ky tu'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhap lai Password la bat buoc'
    },
    validate: (value: any, formValues: any) => value === formValues.password || "Mat khau khong khop",
    maxLength: {
      value: 160,
      message: 'Do dai tu 6 den 160 ky tu'
    },
    minLength: {
      value: 6,
      message: 'Do dai tu 6 den 160 ky tu'
    }
  }
})

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc ')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 ~ 160 ký tự')
    .max(160, 'Độ dài từ 5 ~ 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 ~ 160 ký tự')
    .max(160, 'Độ dài từ 6 ~ 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Nhập lại Password là bắt buộc')
    .min(6, 'Độ dài từ 6 ~ 160 ký tự')
    .max(160, 'Độ dài từ 6 ~ 160 ký tự')
    .oneOf([yup.ref('password')], 'Nhập lại password không khớp '),
})

export type Schema = yup.InferType<typeof schema>
