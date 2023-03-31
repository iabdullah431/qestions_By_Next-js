import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from 'site-settings/theme'
import RTL from 'site-settings/RTL'
import { IntlProvider } from 'react-intl'
import msgs from 'site-settings/site-translations'
import 'styles/globals.css'

export default function MyApp(props) {
    const {Component, pageProps} = props

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <React.Fragment>
            <Head>
                <title>questions</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <IntlProvider locale='ar' messages={msgs['ar']}>
                    <RTL>
                        <CssBaseline/>
                        <Component {...pageProps} />
                    </RTL>
                </IntlProvider>
            </ThemeProvider>
        </React.Fragment>
    )
}
export async function getServerSideProps(context) {
	// وظيفة للتحقق من ان المستخدم مسجل
	const logged = () => {
		// إذا كان مسجلاً نعيد true 
		return true
		// إذا لم يكن مسجلاً نعيد false 
		return false
	}
	if (logged()) {
		return {
			props: {}, // will be passed to the page component as props
		}
	} else return {
		redirect: {
			destination: '/login',
			permanent: false,
		},
	}
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

