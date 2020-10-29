import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/core'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'

interface registerProps { }

// const REGISTER_MUT = `
// mutation Register($username: String!, $password: String!) {
//     register(input: { username: $username, password: $password }) {
//       errors {
//         field
//         message
//       }
//       user {
//         id
//         username
//       }
//     }
//   }
// `

export const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
    const [, register] = useRegisterMutation()
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register(values)
                    if (response.data?.register.errors) {
                        [{field: 'username', message: 'something wrong'}]
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        // worked
                        router.push('/')
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name='username'
                            placeholder='username'
                            label='Username'
                        />
                        <Box mt={4}>
                            <InputField
                                name='password'
                                placeholder='password'
                                label='Password'
                                type='password'
                            />
                        </Box>
                        <Button
                            type='submit'
                            variantColor='teal'
                            mt={4}
                            isLoading={isSubmitting}
                        >
                            register
                        </Button>
                        {/* <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input
                                value={values.username}
                                id="name"
                                placeholder="username"
                                onChange={handleChange}
                            />
                            <FormErrorMessage>{}</FormErrorMessage>
                        </FormControl> */}
                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Register)
