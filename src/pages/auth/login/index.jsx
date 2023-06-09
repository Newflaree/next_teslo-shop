// React
import { useContext, useEffect, useState } from 'react';
// Next.js
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// NextAuth
import {
  getProviders,
  getSession,
  signIn
} from 'next-auth/react';
// Material UI
import {
  Box,
  Button,
  Link,
  Grid,
  TextField,
  Typography,
  Chip,
  Divider
} from '@mui/material';
// Material Icons
import { ErrorOutline } from '@mui/icons-material';
// React Hook Form
import { useForm } from 'react-hook-form';
//
// Api
import { tesloApi } from '@/api';
// Layouts
import { AuthLayout } from '@/components/layouts';
// Context
import { AuthContext } from '@/context';
// Utils
import { validation } from '@/utils';


const LoginPage = () => {
  const { replace, query } = useRouter();
  const { loginUser } = useContext( AuthContext );
  const [ showError, setShowError ] = useState( false );
  const [ providers, setProviders ] = useState({});
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  useEffect( () => {
    getProviders()
      .then( prov => {
        console.log({ prov });
        setProviders( prov );
      });
  }, [] );

  const onLoginUser = async ({ email, password }) => {
    setShowError( false );

    /*
    const isValidLogin = await loginUser( email, password );

    if ( !isValidLogin ) {
      setShowError( true );
      setTimeout( () => setShowError( false ), 4000 );
      return;
    }

    const destination = query.page?.toString() || '/';

    replace( destination );
      * */
    await signIn( 'credentials', { email, password });
  }

  return (
    <AuthLayout title='Ingresar'>
      <form
        onSubmit={ handleSubmit( onLoginUser ) }
        noValidate={ true }
      >
        <Box
          sx={{
            width: 350,
            padding: '10px 20px'
          }}
        >
          <Grid
            className="fadeIn"
            container
            spacing={ 2 }
          >
            <Grid
              item
              xs={ 12 }
              paddingY={ 4 }
            >
              <Typography
                variant='h1'
                component='h1'
                sx={{
                  textAlign: 'center'
                }}
              >
                Iniciar Sesión
              </Typography>
              <Chip 
                className='fadeIn'
                label='Correo electrónico o contraseña inválidos'
                color='error'
                icon={ <ErrorOutline /> }
                sx={{
                  mt: 2,
                  display: showError ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
            >
              <TextField 
                type='email'
                label='Correo'
                fullWidth
                variant='filled'
                { ...register( 'email', {
                  required: 'Este campo es requerido',
                  validate: validation.isEmail
                }) }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
            >
              <TextField 
                type='password'
                label='Contraseña'
                fullWidth
                variant='filled'
                { ...register( 'password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 carácteres' }
                }) }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            <Grid
              item
              xs={ 12 }
              marginY={ 2 }
            >
              <Button
                type='submit'
                fullWidth
                color='secondary'
                className='circular-btn'
                size='large'
              >
                Ingresar
              </Button>
            </Grid>

            <Grid
              item
              xs={ 12 }
              display='flex'
              justifyContent='end'
            >
              <NextLink
                href={ query.page ? `/auth/register?page=${ query.page }` : '/auth/register' }
                passHref
                legacyBehavior
              >
                <Link
                  underline='always'
                  color='rgba(0,0,0)'
                >
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={ 12 }
              display='flex'
              flexDirection='column'
              justifyContent='end'
            >
              <Divider sx={{ width: '100%', mb: 2 }}/>

              {
                Object.values( providers ).map( ( provider ) => {
                  if ( provider.id === 'credentials' ) return;

                  return (
                    <Button
                      key={ provider.id }
                      variant='outlined'
                      fullWidth
                      color='primary'
                      sx={{
                        mb: 1
                      }}
                      onClick={ () => signIn( provider.id ) }
                    >
                      { provider.name }
                    </Button>
                  )
                })
              }

            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}


export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const { page = '/' } = query;

  if ( session ) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {},
  }
}


export default LoginPage;
