import React from 'react'
import { Form, Formik } from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'


interface registerProps { }

export const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(values) => {
                    console.log(values)
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

export default Register
