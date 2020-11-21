import React, { useCallback } from 'react'

import * as yup from 'yup'
import { FormField, UIForm } from 'src/components'

import { T } from '@market-ui/falcon-i18n'
import { Button, DefaultThemeProps, Text } from '@deity/falcon-ui'
import { useModalContext } from 'src/components'
import { Dictionary } from 'src/types'
import { toGridTemplate } from 'src/uikitEjected'
import { ObjectSchema } from 'yup'

import { RequestPasswordResetMutation } from 'src/uikitEjected/AccountRecovery/AccountRecoveryMutations'
import { MutationFn } from 'react-apollo'
import { FormikValues } from 'formik'

export type IFieldType = 'email' | 'askEnterEmail' | 'submit'

const area: Dictionary<IFieldType, IFieldType> = {
  email: 'email',
  submit: 'submit',
  askEnterEmail: 'askEnterEmail',
}

const layout: DefaultThemeProps = {
  addressFormLayout: {
    display: 'grid',
    gridGap: 'xs',
    fontSize: 'xs',
    // prettier-ignore
    gridTemplate: toGridTemplate([
      ['1fr'             ],
      [area.askEnterEmail],
      [area.email        ],
      [area.submit       ]
    ])
  },
}

const genValidationSchema = (): ObjectSchema => {
  const validator: any = {}

  validator.email = yup
    .string()
    .email()
    .required();

  return yup.object().shape(validator)
}

interface IProps {
  initialValues?: Dictionary<IFieldType, any>
  onFinish?: () => void
}
export const ForgetForm = ({ initialValues, onFinish }: IProps) => {
  const { closeModal } = useModalContext()

  const onSubmit = useCallback(function (mutation: MutationFn, data) {
    return mutation({
      variables: {
        input: {
          email: data.email,
        },
      },
    }).then(closeModal)
  }, [])

  return (
    <RequestPasswordResetMutation onCompleted={onFinish}>
      {(requestCustomerPasswordResetToken, { loading }) => {
        return (
          <UIForm
            name="forget-form"
            id="forget-form"
            defaultTheme={layout}
            i18nId="auth.form"
            initialValues={{
              ...initialValues,
            }}
            onSubmit={(values: FormikValues) =>
              onSubmit(requestCustomerPasswordResetToken, values)
            }
            validationSchema={genValidationSchema()}
          >
            {({ isValid }) => (
              <React.Fragment>
                <Text
                  gridArea={area.askEnterEmail}
                  css={{ textAlign: 'start' }}
                >
                  <T id="auth.formForget.askEnterEmail._1" />
                  <br />
                  <T id="auth.formForget.askEnterEmail._2" />
                </Text>

                <FormField
                  name="email"
                  type="email"
                  required
                  gridArea={area.email}
                />

                <Button
                  gridArea={area.submit}
                  type="submit"
                  disabled={!isValid || loading}
                >
                  <Text as="span">
                    <T id="auth.formForget.btnSendEmail" />
                  </Text>
                </Button>
              </React.Fragment>
            )}
          </UIForm>
        )
      }}
    </RequestPasswordResetMutation>
  )
}
