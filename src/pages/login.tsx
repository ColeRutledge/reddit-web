import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button } from '@chakra-ui/core'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'

interface LoginProps { }

export const Login: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [, login] = useLoginMutation()
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({ input: values })
                    if (response.data?.login.errors) {
                        [{field: 'username', message: 'something wrong'}]
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
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
                            login
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

export default Login
